import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SellContract} from './sell-contract.model';
import {SellContractService} from './sell-contract.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Person, PersonService} from '../person';
import {Customer, CustomerService} from '../customer';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-sell-contract',
    templateUrl: './sell-contract.component.html'
})
export class SellContractComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sellContracts: SellContract[];
    sellContract: SellContract = new SellContract();
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
    breadcrumbItems: any[];
    customerId: number;
    personId: number;
    person: Person;
    customer: Customer;
    addendum: boolean;
    contractNo: any;

    constructor(private sellContractService: SellContractService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private $sessionStorage: SessionStorageService,
                private translateService: TranslateService,
                private personService: PersonService,
                private customerService: CustomerService,
                private eventManager: JhiEventManager,
                private searchHistoryService: SearchHistoryService
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
        this.contractNo = activatedRoute.snapshot.queryParams['contractNo'] ? +activatedRoute.snapshot.queryParams['contractNo'] : null;
        this.addendum = activatedRoute.snapshot.data['addendum'] ? activatedRoute.snapshot.data['addendum'] : false;
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(SellContractComponent.name);
            if (searchHistory) {
                this.currentSearch = searchHistory.value;
            }
        }
        this.sellContract.active = null;

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
                if (value[0] === 'active') {
                    this.sellContract[value[0]] = Boolean(value[1]);
                } else {
                    this.sellContract[value[0]] = value[1];
                }
            }
        }

    }

    loadAll() {
        this.sellContractService.query(
            {
                customerId: this.customerId ? this.customerId : null,
                personId: this.personId ? this.personId : null,
                customerName: this.sellContract.customerName ? this.sellContract.customerName : null,
                personName: this.sellContract.personName ? this.sellContract.personName : null,
                contractNo: this.sellContract.contractNo ? this.sellContract.contractNo : this.addendum ? this.contractNo : null,
                active: this.sellContract.active ? this.sellContract.active : null,
                addendum: this.addendum ? this.addendum : false,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
            (res: HttpResponse<SellContract[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/sell-contract'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });

        this.sellContract.active = null;
        this.sellContract.contractNo = null;
        if (!this.personId) {
            this.sellContract.personName = null;
        }
        if (!this.customerId) {
            this.sellContract.customerName = null;
        }
        this.loadAll();
        this.searchHistoryService.clear(SellContractComponent.name);

    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sellContract.startDate) {
            this.currentSearch += 'startDate→' + this.sellContract.startDate.toISOString() + '&';
        }
        if (this.sellContract.finishDate) {
            this.currentSearch += 'finishDate→' + this.sellContract.finishDate.toISOString() + '&';
        }
        if (this.sellContract.contractNo) {
            this.currentSearch += 'contractNo$' + this.sellContract.contractNo + '&';
        }
        if (this.sellContract.personName) {
            this.currentSearch += 'personName$' + this.sellContract.personName + '&';
        }
        if (this.sellContract.customerName) {
            this.currentSearch += 'customerName$' + this.sellContract.customerName + '&';
        }
        if (this.sellContract.active) {
            this.currentSearch += 'active;' + this.sellContract.active + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/sell-contract'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(SellContractComponent.name, this.currentSearch);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get(['global.menu.home', 'niopdcgatewayApp.customer.home.title', 'niopdcgatewayApp.person.home.title',
            'niopdcgatewayApp.sellContract.home.title', 'niopdcgatewayApp.sellContract.addendum']).subscribe(titles => {
            this.breadcrumbItems.push({label: titles['global.menu.home'], routerLink: ['/']});

            if (this.person || this.customer) {
                if (this.customer) {
                    this.breadcrumbItems.push(
                        {
                            label: titles['niopdcgatewayApp.customer.home.title'] + ' (' + this.customer.name + ')',
                            routerLink: ['/customer']
                        }
                    );
                } else {
                    this.breadcrumbItems.push({
                        label: titles['niopdcgatewayApp.person.home.title'] + ' (' + this.person.fullName + ')',
                        routerLink: ['/person']
                    });
                }
            }
            this.breadcrumbItems.push(
                {
                    label: titles['niopdcgatewayApp.sellContract.home.title'],
                    routerLink: ['/sell-contract']
                });
            if (this.addendum) {
                this.breadcrumbItems.push(
                    {
                        label: titles['niopdcgatewayApp.sellContract.addendum']
                    });
            }

        });

    }

    ngOnInit() {

        if (this.addendum && !this.contractNo) {
            this.router.navigate(['/sell-contract'], {
                queryParams: {
                    person: this.personId ? this.personId : null,
                    customer: this.customerId ? this.customerId : null
                }
            });
        }

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInSellContracts();
        if (this.personId) {
            this.personService.findCache(this.personId)
                .subscribe(value => {
                    this.person = value.body;
                    this.sellContract.personName = this.person.fullName;
                    this.setBreadCrumb();
                });
        } else if (this.customerId) {
            this.customerService.findCache(this.customerId)
                .subscribe(value => {
                    this.customer = value.body;
                    this.sellContract.customerName = this.customer.name;
                    this.setBreadCrumb();
                });
        } else {
            this.setBreadCrumb();
        }

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSellContracts() {
        this.eventSubscriber = this.eventManager.subscribe('sellContractListModification', response => {
            if (response.content !== null) {
                this.onErrorInConfirm(response.content);
            }
            this.loadAll();
        });
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

            this.router.navigate(['/sell-contract'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    person: this.personId ? this.personId : null,
                    customer: this.customerId ? this.customerId : null,
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
        this.sellContracts = data;
        this.$sessionStorage.store('person', this.personId);
        this.$sessionStorage.store('customer', this.customerId);

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onErrorInConfirm(error) {
        this.jhiAlertService.error('error.sellContract.confirm.customers', {param0: error}, null);
    }
}
