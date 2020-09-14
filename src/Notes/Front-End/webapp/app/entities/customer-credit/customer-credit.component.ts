import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CustomerCredit} from './customer-credit.model';
import {CustomerCreditService} from './customer-credit.service';
import {Principal} from '../../shared';
import {Customer, CustomerService} from '../customer/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {PersonService} from '../person/person.service';
import {Person} from '../person/person.model';
import {BuyType} from '../buy-type/buy-type.model';
import {BuyTypeService} from '../buy-type/.';
import {SellContractProduct, SellContractProductService} from '../sell-contract-product';

@Component({
    selector: 'jhi-customer-credit',
    templateUrl: './customer-credit.component.html'
})
export class CustomerCreditComponent implements OnInit, OnDestroy {
    person: Person;

    currentAccount: any;
    customerCredits: CustomerCredit[];
    buyTypes: BuyType[];
    customerCredit: CustomerCredit = new CustomerCredit();
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
    personId: number;
    sellContractProductId: number;
    customer: Customer;
    sellContractProduct: SellContractProduct;
    breadcrumbItems: any[];
    isCredit: boolean;
    manualQuota: boolean;
    archive = false;

    constructor(private customerCreditService: CustomerCreditService,
                private customerService: CustomerService,
                private personService: PersonService,
                private sellContractProductService: SellContractProductService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private buyTypeService: BuyTypeService,
                private principal: Principal,
                public route: ActivatedRoute,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
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
        this.personId = activatedRoute.snapshot.params['personId'];
        if (activatedRoute.snapshot.queryParams['isCredit'] != null) {
            this.isCredit = Boolean(JSON.parse(activatedRoute.snapshot.queryParams['isCredit']));
        }

        this.sellContractProductId = activatedRoute.snapshot.params['sellContractProductId'];

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
                this.customerCredit[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        if (this.customerId) {
            this.customerCreditService.queryByCustomer(this.customerId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                isCredit: this.isCredit,
                archive : this.archive,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<CustomerCredit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.personId) {
            this.customerCreditService.queryByPerson(this.personId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                isCredit: this.isCredit,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<CustomerCredit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.sellContractProductId) {
            this.customerCreditService.queryBySellContractProductId(this.sellContractProductId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                isCredit: this.isCredit,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<CustomerCredit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.sellContractProductService.find(this.sellContractProductId).subscribe(value => {
                this.manualQuota = value.body.manualQuota;
            });


        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.customerId) {
            this.router.navigate(['customer/' + this.customerId + '/customer-credit'], {
                queryParams: {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        } else if (this.personId) {
            this.router.navigate(['person/' + this.personId + '/person-credit'], {
                    queryParams: {
                        page: this.page,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                }
            );
        }
        this.customerCredit = new CustomerCredit();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.customerCredit.startDate) {
            this.currentSearch += 'startDate→' + this.customerCredit.startDate.toISOString() + '&';
        }
        if (this.customerCredit.finishDate) {
            this.currentSearch += 'finishDate→' + this.customerCredit.finishDate.toISOString() + '&';
        }
        if (this.customerCredit.creditNumber) {
            this.currentSearch += 'creditNumber☼' + this.customerCredit.creditNumber + '&';
        }
        if (this.customerCredit.currentCredit) {
            this.currentSearch += 'currentCredit☼' + this.customerCredit.currentCredit + '&';
        }
        if (this.customerCredit.sellContractNo) {
            this.currentSearch += 'product.sellContract.contractNo$' + this.customerCredit.sellContractNo + '&';
        }
        if (this.customerCredit.currentAmount) {
            this.currentSearch += 'currentAmount☼' + this.customerCredit.currentAmount + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.customerId) {
            this.router.navigate(['customer/' + this.customerId + '/customer-credit'], {
                queryParams: {
                    search: this.currentSearch,
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        } else if (this.personId) {
            this.router.navigate(['person/' + this.personId + '/customer-credit'], {
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
            this.translateService.get('niopdcgatewayApp.customerCredit.home.customerTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.customer.name})`, routerLink: ['/customer']});
            });
            let param = 'quota';
            if  (this.isCredit) {
                param = 'credit';
            }
            this.translateService.get('niopdcgatewayApp.customerCredit.home.' + param).subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        } else if (this.personId) {
            this.translateService.get('niopdcgatewayApp.personCredit.home.personTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.person.fullName})`, routerLink: ['/person']});
            });
            this.translateService.get('niopdcgatewayApp.personCredit.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        } else if (this.sellContractProductId) {
            this.translateService.get('niopdcgatewayApp.sellContractProductCredit.home.sellContractTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title, routerLink: [`/sell-contract`]});
            });
            this.translateService.get('niopdcgatewayApp.sellContractProductCredit.home.sellContractProductTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: [`/sell-contract/${this.sellContractProduct.sellContractId}/sell-contract-product/`]
                });
            });
            this.translateService.get('niopdcgatewayApp.sellContractProductCredit.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }
    }

    ngOnInit() {
        this.buyTypeService.queryForCustomerCredit(null, null)
            .subscribe(res => {
                this.buyTypes = res.body;
            });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCustomerCredits();
        if (this.customerId) {
            this.customerService.find(this.customerId).subscribe(
                (customer: HttpResponse<Customer>) => {
                    this.customer = customer.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.personId) {
            this.personService.find(this.personId).subscribe(
                (person: HttpResponse<Person>) => {
                    this.person = person.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.sellContractProductId) {
            this.sellContractProductService.find(this.sellContractProductId)
                .subscribe(value => {
                    this.sellContractProduct = value.body;
                    this.setBreadCrumb();
                });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerCredit) {
        return item.id;
    }

    registerChangeInCustomerCredits() {
        this.eventSubscriber = this.eventManager.subscribe('customerCreditListModification', response => this.loadAll());
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

            this.router.navigate(this.personId ?
                ['person', this.personId, 'person-credit'] :
                ['customer', this.customerId, 'customer-credit'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });

        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.customerCredits = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
