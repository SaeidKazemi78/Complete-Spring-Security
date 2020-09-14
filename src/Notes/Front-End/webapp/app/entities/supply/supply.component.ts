import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Supply} from './supply.model';
import {SupplyService} from './supply.service';
import {Principal} from '../../shared';

import {Product, ProductService} from '../product/.';
import {Depot, DepotService} from '../depot/.';
import {Country, CountryService} from '../country/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-supply',
    templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit, OnDestroy {

    currentAccount: any;
    supplies: Supply[];
    supply: Supply = new Supply();
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

    products: Product[];
    depots: Depot[];
    countries: Country[];

    constructor(
        private supplyService: SupplyService,
        private productService: ProductService,
        private depotService: DepotService,
        private countryService: CountryService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
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
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.supply[value[0]] = Number(value[1]);
                } else {
                    this.supply[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.supplyService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Supply[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.supply = new Supply();
        this.router.navigate(['/supply'], {
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
        if (this.supply.amount) {
            this.currentSearch += 'amount☼' + this.supply.amount + '&';
        }
        if (this.supply.basePrice) {
            this.currentSearch += 'basePrice☼' + this.supply.basePrice + '&';
        }
        if (this.supply.broker) {
            this.currentSearch += 'broker$' + this.supply.broker + '&';
        }
        if (this.supply.supplyDate) {
            this.currentSearch += 'supplyDate→' + this.supply.supplyDate.toISOString() + '&';
        }
        if (this.supply.productId) {
            this.currentSearch += 'product.id☼' + this.supply.productId + '&';
        }
        if (this.supply.depotId) {
            this.currentSearch += 'depot.id☼' + this.supply.depotId + '&';
        }
        if (this.supply.countryId) {
            this.currentSearch += 'country.id☼' + this.supply.countryId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/supply'], {
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
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.supply.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.productService.query().subscribe(
            (res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }
        );
        this.depotService.query().subscribe(
            (res: HttpResponse<Depot[]>) => {
                this.depots = res.body;
            }
        );
        this.countryService.query().subscribe(
            (res: HttpResponse<Country[]>) => {
                this.countries = res.body;
            }
        );

        this.registerChangeInSupplies();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Supply) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    registerChangeInSupplies() {
        this.eventSubscriber = this.eventManager.subscribe('supplyListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        let predicate = this.predicate;
        let reverse = this.reverse;
        let page = this.page;
        let itemsPerPage = this.itemsPerPage;
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

            this.router.navigate(['/supply'], {
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
        this.supplies = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
