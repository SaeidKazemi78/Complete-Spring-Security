import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CustomerTypeProductConsumption} from './customer-type-product-consumption.model';
import {CustomerTypeProductConsumptionService} from './customer-type-product-consumption.service';
import {Principal} from '../../shared';
import {CustomerType, CustomerTypeService} from '../customer-type/.';
import {Product, ProductService} from '../product/.';
import {Consumption, ConsumptionService} from '../consumption/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-customer-type-product-consumption',
    templateUrl: './customer-type-product-consumption.component.html'
})
export class CustomerTypeProductConsumptionComponent implements OnInit, OnDestroy {

    currentAccount: any;
    customerTypeProductConsumptions: CustomerTypeProductConsumption[];
    customerTypeProductConsumption: CustomerTypeProductConsumption = new CustomerTypeProductConsumption();
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
    productId: number;
    product: Product;
    breadcrumbItems: any[];

    consumptions: Consumption[];

    constructor(
        private customerTypeProductConsumptionService: CustomerTypeProductConsumptionService,
        private productService: ProductService,
        private consumptionService: ConsumptionService,
        private customerTypeService: CustomerTypeService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.productId = activatedRoute.snapshot.params['productId'];

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
                    this.customerTypeProductConsumption[value[0]] = Number(value[1]);
                } else {
                    this.customerTypeProductConsumption[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.customerTypeProductConsumptionService.query(this.productId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CustomerTypeProductConsumption[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['product/' + this.productId + '/customer-type-product-consumption'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.customerTypeProductConsumption = new CustomerTypeProductConsumption();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.customerTypeProductConsumption.productId) {
            this.currentSearch += 'product.title$' + this.customerTypeProductConsumption.productId + '&';
        }
        if (this.customerTypeProductConsumption.consumptionId) {
            this.currentSearch += 'consumption.id☼' + this.customerTypeProductConsumption.consumptionId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['product/' + this.productId + '/customer-type-product-consumption'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customerTypeProductConsumption.home.productTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.product.title})`, routerLink: ['/product']});
        });
        this.translateService.get('niopdcgatewayApp.customerTypeProductConsumption.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCustomerTypeProductConsumptions();

        this.productService.find(this.productId).subscribe(
            (product: HttpResponse<Product>) => {
                this.product = product.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerTypeProductConsumption) {
        return item.id;
    }

    trackConsumptionById(index: number, item: Consumption) {
        return item.id;
    }

    registerChangeInCustomerTypeProductConsumptions() {
        this.eventSubscriber = this.eventManager.subscribe('customerTypeProductConsumptionListModification', response => this.loadAll());
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

            this.router.navigate(['product', this.productId, 'customer-type-product-consumption'], {
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
        this.customerTypeProductConsumptions = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
