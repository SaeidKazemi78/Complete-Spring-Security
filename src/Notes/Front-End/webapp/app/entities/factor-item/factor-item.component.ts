import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FactorItem } from './factor-item.model';
import { FactorItemService } from './factor-item.service';
import { ITEMS_PER_PAGE, Principal} from '../../shared';
import { Factor, FactorService } from '../factor/.';
import { LazyLoadEvent } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'jhi-factor-item',
    templateUrl: './factor-item.component.html'
})
export class FactorItemComponent implements OnInit, OnDestroy {

    currentAccount: any;
    factorItems: FactorItem[];
    factorItem: FactorItem = new FactorItem();
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
    factorId: number;
    factor: Factor;
    breadcrumbItems: any[];

        factors: Factor[];

    constructor(
        private factorItemService: FactorItemService,
         private factorService: FactorService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.factorId = activatedRoute.snapshot.params['factorId'];

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
                    this.factorItem[value[0]] = Number(value[1]);
                } else {
                    this.factorItem[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.factorItemService.query(this.factorId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<FactorItem[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['factor/' + this.factorId + '/factor-item'], {
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
        if (this.factorItem.orderId) {
            this.currentSearch += 'orderId☼' + this.factorItem.orderId + '&';
        }
        if (this.factorItem.orderProductId) {
            this.currentSearch += 'orderProductId☼' + this.factorItem.orderProductId + '&';
        }
        if (this.factorItem.description) {
            this.currentSearch += 'description$' + this.factorItem.description + '&';
        }
        if (this.factorItem.amount) {
            this.currentSearch += 'amount☼' + this.factorItem.amount + '&';
        }
        if (this.factorItem.productUnit) {
            this.currentSearch += 'productUnit$' + this.factorItem.productUnit + '&';
        }
        if (this.factorItem.productRatePrice) {
            this.currentSearch += 'productRatePrice☼' + this.factorItem.productRatePrice + '&';
        }
        if (this.factorItem.basePrice) {
            this.currentSearch += 'basePrice☼' + this.factorItem.basePrice + '&';
        }
        if (this.factorItem.costPrice) {
            this.currentSearch += 'costPrice☼' + this.factorItem.costPrice + '&';
        }
        if (this.factorItem.totalPrice) {
            this.currentSearch += 'totalPrice☼' + this.factorItem.totalPrice + '&';
        }
        if (this.factorItem.factorId) {
            this.currentSearch += 'factor.id☼' + this.factorItem.factorId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['factor/' + this.factorId + '/factor-item'], {
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
        this.translateService.get('niopdcgatewayApp.factorItem.home.factorTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.factor.factorNo})`, routerLink: ['/factor']});
        });
        this.translateService.get('niopdcgatewayApp.factorItem.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

                this. factorService.query().subscribe(res => {
                this.factors = res.body;
            }
        );

        this.registerChangeInFactorItems();

        this.factorService.find(this.factorId).subscribe(factor => {
                this.factor = factor.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FactorItem) {
        return item.id;
    }
    trackFactorById(index: number, item: Factor) {
        return item.id;
    }

    registerChangeInFactorItems() {
        this.eventSubscriber = this.eventManager.subscribe('factorItemListModification',response => this.loadAll());
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
        this.factorItems = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
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
            this.reverse != reverse) {

            this.router.navigate(['factor' , this.factorId , 'factor-item'], {
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
