import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SellContractProduct} from './sell-contract-product.model';
import {SellContractProductService} from './sell-contract-product.service';
import {Principal} from '../../shared';
import {SellContract, ContractType, SellContractService} from '../sell-contract';
import {Consumption, ConsumptionService} from '../consumption';
import {Product, ProductService} from '../product';
import {SellContractCustomer} from '../sell-contract';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {RateGroup, RateGroupService} from '../rate-group';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {SellContractCustomerService} from '../sell-contract/sell-contract-customer.service';

@Component({
    selector: 'jhi-sell-contract-product',
    templateUrl: './sell-contract-product.component.html'
})
export class SellContractProductComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sellContractProducts: SellContractProduct[];
    sellContractProduct: SellContractProduct = new SellContractProduct();
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
    sellContractId: number;
    sellContract: SellContract;
    ContractType = ContractType;
    breadcrumbItems: any[];

    consumptions: Consumption[];
    products: Product[];
    sellcontractcustomers: SellContractCustomer[];
    currencyRateGroups: CurrencyRateGroup[];
    rateGroups: RateGroup[];

    customerId: number;
    personId: number;

    constructor(
        private sellContractProductService: SellContractProductService,
        private consumptionService: ConsumptionService,
        private productService: ProductService,
        private sellContractCustomerService: SellContractCustomerService,
        private currencyRateGroupService: CurrencyRateGroupService,
        private rateGroupService: RateGroupService,
        private sellContractService: SellContractService,
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
        this.sellContractId = activatedRoute.snapshot.params['sellContractId'];
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
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
                    this.sellContractProduct[value[0]] = Number(value[1]);
                } else {
                    this.sellContractProduct[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.sellContractProductService.query(this.sellContractId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort(),
            person: this.personId ? this.personId : null,
            customer: this.customerId ? this.customerId : null
        }).subscribe(
            (res: HttpResponse<SellContractProduct[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackCurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['sell-contract/' + this.sellContractId + '/sell-contract-product'], {
            queryParams: {
                page: this.page,
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.sellContractProduct = new SellContractProduct();
        this.loadAll();
    }

    trackRateGroupById(index: number, item: RateGroup) {
        return item.id;
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sellContractProduct.rateGroupId) {
            this.currentSearch += 'rateGroupId☼' + this.sellContractProduct.rateGroupId + '&';
        }
        if (this.sellContractProduct.currencyRateGroupId) {
            this.currentSearch += 'currencyRateGroupId☼' + this.sellContractProduct.currencyRateGroupId + '&';
        }
        if (this.sellContractProduct.consumptionId) {
            this.currentSearch += 'consumption.id☼' + this.sellContractProduct.consumptionId + '&';
        }
        if (this.sellContractProduct.productId) {
            this.currentSearch += 'product.id☼' + this.sellContractProduct.productId + '&';
        }
        if (this.sellContractProduct.sellContractCustomerId) {
            this.currentSearch += 'sellContractCustomer.id☼' + this.sellContractProduct.sellContractCustomerId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['sell-contract/' + this.sellContractId + '/sell-contract-product'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
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
        this.translateService.get('niopdcgatewayApp.sellContract.home.title').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.sellContract.contractNo})`,
                routerLink: ['/sell-contract'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        this.translateService.get('niopdcgatewayApp.sellContractProduct.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.consumptionService.query().subscribe(
            (res: HttpResponse<Consumption[]>) => {
                this.consumptions = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query().subscribe(
            (res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.sellContractCustomerService.queryBySellContract(this.sellContractId)
            .subscribe((res: HttpResponse<SellContractCustomer[]>) => {
                this.sellcontractcustomers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.rateGroupService.query()
            .subscribe((res: HttpResponse<RateGroup[]>) => {
                this.rateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.registerChangeInSellContractProducts();

        this.sellContractService.find(this.sellContractId).subscribe(
            (sellContract: HttpResponse<SellContract>) => {
                this.sellContract = sellContract.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SellContractProduct) {
        return item.id;
    }

    trackConsumptionById(index: number, item: Consumption) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackSellContractCustomerById(index: number, item: SellContractCustomer) {
        return item.id;
    }

    registerChangeInSellContractProducts() {
        this.eventSubscriber = this.eventManager.subscribe('sellContractProductListModification',response => this.loadAll());
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

            this.router.navigate(['sell-contract', this.sellContractId, 'sell-contract-product'], {
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
        this.sellContractProducts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
