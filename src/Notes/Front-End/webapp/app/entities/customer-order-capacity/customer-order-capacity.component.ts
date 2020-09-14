import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {LazyLoadEvent} from 'primeng/primeng';

import {CustomerOrderCapacity} from './customer-order-capacity.model';
import {CustomerOrderCapacityService} from './customer-order-capacity.service';
import {Principal} from '../../shared';
import {Customer, CustomerService} from '../customer/.';
import {TranslateService} from '@ngx-translate/core';
import {SellContractProductService} from '../sell-contract-product';

@Component({
    selector: 'jhi-customerc-order-capacity',
    templateUrl: './customer-order-capacity.component.html'
})
export class CustomerOrderCapacityComponent implements OnInit, OnDestroy {

    customerOrderCapacity: CustomerOrderCapacity = new CustomerOrderCapacity();
    customerOrderCapacitys: CustomerOrderCapacity[];
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
    predicate: any = 'capacity';
    previousPage: any;
    reverse: any;
    customerId: number;
    customer: Customer;
    breadcrumbItems: any[];
    currentAccount: any;

    constructor(private customerOrderCapacityService: CustomerOrderCapacityService,
                private customerService: CustomerService,
                private sellContractProductService: SellContractProductService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
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

            this.customerOrderCapacity[value[0]] = value[1];
        }

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

            this.router.navigate(['customer/' + this.customerId + '/customer-order-capacity'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                }
            });
            this.loadAll();
        }
    }

    loadAll() {
        this.customerOrderCapacityService.queryByCustomer(this.customerId, false, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CustomerOrderCapacity[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.customerOrderCapacity.capacity) {
            this.currentSearch += 'capacity☼' + this.customerOrderCapacity.capacity + '&';
        }
        if (this.customerOrderCapacity.productGroupTitle) {
            this.currentSearch += 'productGroup.title$' + this.customerOrderCapacity.productGroupTitle + '&';
        }
        if (this.customerOrderCapacity.active) {
            this.currentSearch += 'active;' + this.customerOrderCapacity.active + '&';
        }
        if (this.customerOrderCapacity.registerType && this.customerOrderCapacity.registerType !== "null") {
            this.currentSearch += 'registerType#' + 'RegisterType.'+this.customerOrderCapacity.registerType + '&';
        }

        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }
        this.router.navigate(['customer/' + this.customerId + '/customer-order-capacity'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    loadCapacity() {
        this.customerOrderCapacityService.queryByCustomer(this.customerId, true, {
            page: this.page,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<CustomerOrderCapacity[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.customerId) {
            this.translateService.get('niopdcgatewayApp.customerOrderCapacity.home.customerTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.customer.name})`, routerLink: ['/customer']});
            });
            this.translateService.get('niopdcgatewayApp.customerOrderCapacity.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerOrderCapacitys();
        if (this.customerId) {
            this.customerService.find(this.customerId).subscribe(
                (customer: HttpResponse<Customer>) => {
                    this.customer = customer.body;
                    this.setBreadCrumb();
                }
            );
        }
        this.page = 0;

        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerOrderCapacity) {
        return item.id;
    }

    registerChangeInCustomerOrderCapacitys() {
        this.eventSubscriber = this.eventManager.subscribe('customerOrderCapacityListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.customerOrderCapacitys = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['customer/' + this.customerId + '/customer-order-capacity'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.customerOrderCapacity = new CustomerOrderCapacity();
        this.customerOrderCapacity.active = null;
        this.loadAll();
    }


}
