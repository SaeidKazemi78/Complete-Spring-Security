import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {RateDifference, RateDifferenceType} from './rate-difference.model';
import {RateDifferenceService} from './rate-difference.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SellContractProduct, SellContractProductService} from 'app/entities/sell-contract-product';
import {ProductRate, ProductRateService} from 'app/entities/product-rate';
import {Customer, CustomerService} from 'app/entities/customer';

@Component({
    selector: 'jhi-rate-difference',
    templateUrl: './rate-difference.component.html'
})
export class RateDifferenceComponent implements OnInit, OnDestroy {

    currentAccount: any;
    rateDifferences: RateDifference[];
    rateDifference: RateDifference = new RateDifference();
    rateDifferenceForSearch: RateDifference = new RateDifference();
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
    customProducts: any[];
    boughtRates: ProductRate[] = [];
    sellContractProducts: SellContractProduct[];
    selectedItem: any;
    productRates: ProductRate[] = [];
    customers: Customer[];
    customer: Customer;
    mode: string;
    RateDifferenceType = RateDifferenceType;
    customerId: number;
    url: any[] = [];

    constructor(
        private rateDifferenceService: RateDifferenceService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        public route: ActivatedRoute,
        private productRateService: ProductRateService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sellContractProductService: SellContractProductService,
        private translateService: TranslateService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.route.queryParams.subscribe(params => {
            this.mode = params['mode'];
            if (this.mode === 'rate-difference') {
                this.url = ['/rate-difference'];
            } else {
                this.customerId = activatedRoute.snapshot.params['customerId'];
                this.url = ['/customer', this.customerId, 'rate-difference'];
            }
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
                this.rateDifference[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.rateDifferenceService.query({
            rateDifferenceType:
                this.mode === 'rate-difference' ? this.RateDifferenceType[this.RateDifferenceType.RATE_DIFFERENCE] : this.RateDifferenceType[this.RateDifferenceType.TANK_CAPACITY],
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<RateDifference[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(this.url, {
            queryParams: {
                mode: this.mode,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
        this.rateDifference = new RateDifference();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.rateDifferenceForSearch.customerName) {
            this.currentSearch += 'customer|name$' + this.rateDifferenceForSearch.customerName + '&';
        }
        if (this.rateDifferenceForSearch.productTitle) {
            this.currentSearch += 'product|title$' + this.rateDifferenceForSearch.productTitle + '&';
        }
        if (this.rateDifferenceForSearch.fromDate) {
            this.currentSearch += 'fromDate→' + this.rateDifferenceForSearch.fromDate.toISOString() + '&';
        }
        if (this.rateDifferenceForSearch.toDate) {
            this.currentSearch += 'toDate←' + this.rateDifferenceForSearch.toDate.toISOString() + '&';
        }
        if (this.rateDifferenceForSearch.amount) {
            this.currentSearch += 'amount☼' + this.rateDifferenceForSearch.amount + '&';
        }
        if (this.rateDifferenceForSearch.soldRate) {
            this.currentSearch += 'soldRate☼' + this.rateDifferenceForSearch.soldRate + '&';
        }
        if (this.rateDifferenceForSearch.boughtRate) {
            this.currentSearch += 'boughtRate☼' + this.rateDifferenceForSearch.boughtRate + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(this.url, {
            queryParams: {
                mode: this.mode,
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
        this.translateService.get('niopdcgatewayApp.rateDifference.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.route.queryParams.subscribe(params => {
            this.mode = params['mode'];
            if (this.mode === 'rate-difference') {
                this.url = ['/rate-difference'];
            } else {
                this.customerId = this.activatedRoute.snapshot.params['customerId'];
                this.url = ['/customer', this.customerId, 'rate-difference'];
            }
        });

        if (this.mode === 'rate-difference') {
            this.rateDifference.rateDifferenceType = this.RateDifferenceType[this.RateDifferenceType.RATE_DIFFERENCE];
        } else if (this.mode === 'tank-capacity') {
            this.rateDifference.rateDifferenceType = this.RateDifferenceType[this.RateDifferenceType.TANK_CAPACITY];
        }
        if (!this.rateDifference.id && this.mode === 'tank-capacity') {
            this.rateDifference.customerId = this.customerId;
            this.loadProducts(this.customerId);
        }

        this.registerChangeInRateDifferences();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    pay(item) {
        this.rateDifferenceService.startBankTransaction(item.id)
            .subscribe(value => {
                this.router.navigate(['/', 'rate-difference', item.id, 'payment', value.body]);
            },error1 => this.onError(error1.error));
    }

    trackId(index: number, item: RateDifference) {
        return item.id;
    }

    registerChangeInRateDifferences() {
        this.eventSubscriber = this.eventManager.subscribe('rateDifferenceListModification', response => this.loadAll());
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

            this.router.navigate(this.url, {
                queryParams: {
                    mode: this.mode,
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    loadProducts(customerId) {
        this.customProducts = [];
        this.rateDifference.soldProductRateId = null;
        this.rateDifference.productId = null;
        if (customerId) {
            this.customerService.find(customerId)
                .subscribe(value => {
                    this.customer = value.body;
                    this.rateDifference.customerName = value.body.name;
                });
            this.sellContractProductService.queryByCustomerId(customerId)
                .subscribe((res: HttpResponse<SellContractProduct[]>) => {
                    this.sellContractProducts = res.body;
                    for (let i = 0; i < this.sellContractProducts.length; i++) {
                        this.customProducts.push({
                            value: this.sellContractProducts[i].productId,
                            label: this.sellContractProducts[i].productTitle
                        });
                    }
                }, (res: HttpErrorResponse) => this.onError(res.error));
        }
    }

    save() {
        const sellContractProduct = this.sellContractProducts.find(c => c.productId === this.rateDifference.productId);
        if (!sellContractProduct) {
            return;
        } else {
            this.rateDifference.rateGroupId = sellContractProduct.rateGroupId;
        }
        if (this.rateDifference.id) {
            this.rateDifferenceService.update(this.rateDifference).subscribe(value => {
                this.onSaveSuccess();
            }, error1 => this.onError(error1.error));
        } else {
            this.rateDifferenceService.create(this.rateDifference).subscribe(value => {
                this.onSaveSuccess();
            }, error1 => this.onError(error1.error));
        }
        this.cleanForm();
    }

    edit(item) {
        if (item) {
            this.rateDifference.id = item.id;
            this.rateDifference.customerId = item.customerId;
            this.rateDifference.soldRate = item.soldRate;
            this.rateDifference.amount = item.amount;
            this.rateDifference.toDate = item.toDate;
            this.rateDifference.fromDate = item.fromDate;
            this.rateDifference.productId = item.productId;
            this.rateDifference.rateGroupId = item.rateGroupId;
            this.rateDifference.boughtProductRateId = item.boughtProductRateId;
            this.rateDifference.soldProductRateId = item.soldProductRateId;
            this.onChangeProduct(item.productId);
        }
    }

    cleanForm() {
        this.rateDifference.id = null;
        this.rateDifference.soldRate = null;
        this.rateDifference.boughtRate = null;
        this.rateDifference.boughtProductRateId = null;
        this.rateDifference.soldProductRateId = null;
        this.rateDifference.amount = null;
        this.rateDifference.toDate = null;
        this.rateDifference.fromDate = null;
        this.rateDifference.productId = null;
    }

    onChangeProduct(productId: number) {
        this.productRateService.queryRateDifference(productId, this.customer.typeId, this.customer.customerGroupTitle)
            .subscribe(value => {
                this.productRates = value.body;
            });
        const sellContract = this.sellContractProducts.find(c => c.productId === productId);
        this.boughtRates = [];

        if (sellContract) {
            this.productRateService.getListOfProductRate(sellContract.rateGroupId, productId, this.rateDifference).subscribe(value => {
                this.boughtRates = value.body;
            });
        }
    }

    private onSaveSuccess() {
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.rateDifferences = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
