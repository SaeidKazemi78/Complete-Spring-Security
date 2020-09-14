import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Customer} from './customer.model';
import {CustomerService} from './customer.service';
import {Principal} from '../../shared';

import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, OnDestroy {

    currentAccount: any;
    customers: Customer[];
    customer: Customer = new Customer();
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
    types: CustomerType[];
    CustomerGroup = CustomerGroup;
    locationNames: any[];
    locationName: string;
    customertypes: CustomerType[];

    constructor(private customerService: CustomerService,
                private typeService: CustomerTypeService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
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
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(CustomerComponent.name);
            if (searchHistory) {
                this.currentSearch = searchHistory.value;
            }
        }
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
                    this.customer[value[0]] = Number(value[1]);
                } else {
                    this.customer[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.customerService.query({
            locationName: this.locationName,
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Customer[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/customer'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.customer = new Customer();
        this.customer.buyOneToMany = null;
        this.loadAll();
        this.locationName = null;
        this.searchHistoryService.clear(CustomerComponent.name);
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.customer.name) {
            this.currentSearch += 'name$' + this.customer.name + '&';
        }
        if (this.customer.regionName) {
            this.currentSearch += 'region.name$' + this.customer.regionName + '&';
        }
        if (this.customer.identifyCode) {
            this.currentSearch += 'identifyCode$' + this.customer.identifyCode + '&';
        }
        if (this.customer.typeId) {
            this.currentSearch += 'type.id☼' + this.customer.typeId + '&';
        }
        if (this.customer.customerGroupTitle) {
            this.currentSearch += 'type.customerGroup#CustomerGroup.' + this.customer.customerGroupTitle + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/customer'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(CustomerComponent.name, this.currentSearch);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.typeService.query({page: null}).subscribe(res => {
                this.types = res.body;
                this.customertypes = this.types;
            }
        );

        this.registerChangeInCustomers();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Customer) {
        return item.id;
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('customerListModification', response => this.loadAll());
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

            this.router.navigate(['/customer'], {
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
        this.customers = data;
        this.customers.forEach((customer: Customer) => {
            if (customer.locations && customer.locations.length > 0) {
                this.fillCustomers(customer);
            }
        });
    }

    onChangeCustomerGroup() {
        this.customertypes = this.types.filter(value2 => !this.customer.customerGroupTitle || value2.customerGroup === this.customer.customerGroupTitle);
        this.search();
    }

    private fillCustomers(customer: Customer) {
        for (let i = 0; i < customer.locations.length; i++) {
            if (i === 0) {
                customer.locationNames = customer.locations[i].name;
            } else {
                customer.locationNames += ',' + customer.locations[i].name;
            }
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
