import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TransportContract, TransportContractStatus} from './transport-contract.model';
import {TransportContractService} from './transport-contract.service';
import {Principal} from '../../shared';
import {Customer, CustomerService} from '../customer/.';
import {Person, PersonService} from '../person/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Car, CarService} from '../car';

@Component({
    selector: 'jhi-transport-contract',
    templateUrl: './transport-contract.component.html'
})
export class TransportContractComponent implements OnInit, OnDestroy {

    currentAccount: any;
    transportContracts: TransportContract[];
    transportContract: TransportContract = new TransportContract();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    customerId: number;
    showCreateButton: boolean;
    carId: number;
    customer: Customer;
    car: Car;
    breadcrumbItems: any[];

    customers: Customer[];
    people: Person[];
    TransportContractStatus = TransportContractStatus;

    constructor(private transportContractService: TransportContractService,
                private customerService: CustomerService,
                private personService: PersonService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private carService: CarService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.customerId = activatedRoute.snapshot.params['customerId'];
        this.carId = activatedRoute.snapshot.params['carId'];

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.transportContract[value[0]] = Number(value[1]);
                } else {
                    this.transportContract[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.customerId) {
            this.transportContractService.query(this.customerId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page ,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<TransportContract[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.carId) {
            this.transportContractService.queryByCarId(this.carId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page ,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<TransportContract[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        if (this.customerId) {
            this.router.navigate(['customer/' + this.customerId + '/transport-contract'], {
                queryParams: {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        } else if (this.carId) {
            this.router.navigate(['car/' + this.carId + '/transport-contract'], {
                queryParams: {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }
        this.transportContract = new TransportContract();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.transportContract.contractCode) {
            this.currentSearch += 'contractCode$' + this.transportContract.contractCode + '&';
        }
        if (this.transportContract.confirm ) {
            this.currentSearch += 'confirm;' + this.transportContract.confirm + '&';
        }
        if (this.transportContract.startDate) {
            this.currentSearch += 'startDate→' + this.transportContract.startDate.toISOString() + '&';
        }
        if (this.transportContract.finishDate) {
            this.currentSearch += 'finishDate→' + this.transportContract.finishDate.toISOString() + '&';
        }
        if (this.transportContract.personName) {
            this.currentSearch += 'person.name$' + this.transportContract.personName + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.customerId) {
            this.router.navigate(['customer/' + this.customerId + '/transport-contract'], {
                queryParams: {
                    search: this.currentSearch,
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        } else if (this.carId) {
            this.router.navigate(['car/' + this.carId + '/transport-contract'], {
                queryParams: {
                    search: this.currentSearch,
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.customerId) {
            this.translateService.get('niopdcgatewayApp.transportContract.home.customerTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.customer.name})`, routerLink: ['/customer']});
            });
        } else if (this.carId) {
            this.translateService.get('niopdcgatewayApp.transportContract.home.carTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.car.title})`, routerLink: ['/car']});
            });
        }
        this.translateService.get('niopdcgatewayApp.transportContract.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.personService.query().subscribe(res => {
                this.people = res.body;
            }
        );

        this.registerChangeInTransportContracts();
        this.showCreateButton = true;
        if (this.customerId) {
            this.customerService.find(this.customerId).subscribe(customer => {
                    this.customer = customer.body;
                    this.setBreadCrumb();
                }
            );
            this.customerService.hasFare(this.customerId).subscribe(customer => {
                    this.showCreateButton = customer.body;
                }
            );
        } else if (this.carId) {
            this.carService.find(this.carId)
                .subscribe(car => {
                    this.car = car.body;
                    this.setBreadCrumb();
                });
        }

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransportContract) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    registerChangeInTransportContracts() {
        this.eventSubscriber = this.eventManager.subscribe('transportContractListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            if (this.customerId) {
                this.router.navigate(['customer', this.customerId, 'transport-contract'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.carId) {
                this.router.navigate(['car', this.carId, 'transport-contract'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.transportContracts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
