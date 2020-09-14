import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {ProductRateDifference} from './product-rate-difference.model';
import {ProductRateDifferenceService} from './product-rate-difference.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BankTransactionService} from '../bank-transaction';

@Component({
    selector: 'jhi-product-rate-difference',
    templateUrl: './product-rate-difference.component.html'
})
export class ProductRateDifferenceComponent implements OnInit, OnDestroy {

    currentAccount: any;
    productRateDifferences: ProductRateDifference[];
    productRateDifference: ProductRateDifference = new ProductRateDifference();
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

    constructor(
        private productRateDifferenceService: ProductRateDifferenceService,
        private bankTransactionService: BankTransactionService,
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
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';

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
                this.productRateDifference[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.productRateDifferenceService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ProductRateDifference[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/product-rate-difference'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.productRateDifference.orderNo) {
            this.currentSearch += 'orderNo$' + this.productRateDifference.orderNo + '&';
        }
        if (this.productRateDifference.orderRegisterDate) {
            this.currentSearch += 'orderRegisterDate→' + this.productRateDifference.orderRegisterDate.toISOString() + '&';
        }
        if (this.productRateDifference.exitFromDepotDate) {
            this.currentSearch += 'exitFromDepotDate→' + this.productRateDifference.exitFromDepotDate.toISOString() + '&';
        }
        if (this.productRateDifference.amount) {
            this.currentSearch += 'amount☼' + this.productRateDifference.amount + '&';
        }
        if (this.productRateDifference.fromRateGroupId) {
            this.currentSearch += 'fromRateGroupId☼' + this.productRateDifference.fromRateGroupId + '&';
        }
        if (this.productRateDifference.toRateGroupId) {
            this.currentSearch += 'toRateGroupId☼' + this.productRateDifference.toRateGroupId + '&';
        }
        if (this.productRateDifference.fromProductRatePrice) {
            this.currentSearch += 'fromProductRatePrice☼' + this.productRateDifference.fromProductRatePrice + '&';
        }
        if (this.productRateDifference.toProductRatePrice) {
            this.currentSearch += 'toProductRatePrice☼' + this.productRateDifference.toProductRatePrice + '&';
        }
        if (this.productRateDifference.price) {
            this.currentSearch += 'price☼' + this.productRateDifference.price + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/product-rate-difference'], {
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
        this.translateService.get('niopdcgatewayApp.productRateDifference.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInProductRateDifferences();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductRateDifference) {
        return item.id;
    }

    registerChangeInProductRateDifferences() {
        this.eventSubscriber = this.eventManager.subscribe('productRateDifferenceListModification',response => this.loadAll());
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
        this.productRateDifferences = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    pay(prd: ProductRateDifference) {
        this.productRateDifferenceService.createRequestIdentifier(prd.id).subscribe(value => {
            this.router.navigate([`product-rate-difference/payment/` + value.body]);
        });
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

            this.router.navigate(['/product-rate-difference'], {
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

}
