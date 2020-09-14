import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Order, OrderStatus, OrderType} from '../order/order.model';
import {OrderService} from '../order/order.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-boundary',
    templateUrl: './boundary-sell.component.html'
})
export class BoundarySellComponent implements OnInit {

    eventSubscriber: Subscription;

    orders: Order[];
    order: Order = new Order();
    error: any;
    success: any;
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
    currentAccount: any;

    OrderStatus = OrderStatus;
    OrderType = OrderType;
    searchCarRfId: string;
    orderTypeOptions = [];

    constructor(private orderService: OrderService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private principal: Principal,
                private eventManager: JhiEventManager,
                private translateService: TranslateService,
                private searchHistoryService: SearchHistoryService

    ) {

        this.principal.getAuthenticationState().subscribe(identity => {
            this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSIT_DATA']).then(((value: boolean) => {
                if (value) {
                    this.orderTypeOptions.push({
                        label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSIT'),
                        value: 'BOUNDARY_TRANSIT'
                    });
                }
            }));

            this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSHIP_DATA']).then(((value: boolean) => {
                if (value) {
                    this.orderTypeOptions.push({
                        label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSHIP'),
                        value: 'BOUNDARY_TRANSHIP'
                    });
                }
            }));
        });

        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.order.plaque = activatedRoute.snapshot.queryParams['plaque'] ? activatedRoute.snapshot.queryParams['plaque'] : '';
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(BoundarySellComponent.name);
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
                if (value[0] === 'registerDate') {
                    this.order[value[0]] = new Date(value[1]);
                } else if (value[1].indexOf('.') > 0) {
                    const z = value[1].split('.');
                    value[1] = z[1];
                    this.order[value[0]] = value[1];
                } else {
                    this.order[value[0]] = value[1];
                }
            }
        }

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

    }

    loadAll() {
        if (!this.order.registerDate) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            this.order.registerDate = date;
            this.search();
            return;
        }
        this.orderService.queryBoundary(this.searchCarRfId, this.order.plaque, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Order[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    sort() {
        return [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['boundary-sell/'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.order = new Order();
        this.searchCarRfId = null;
        this.loadAll();
        this.searchHistoryService.clear(BoundarySellComponent.name);

    }

    statusRowSeparated(rowItem: Order) {
        return rowItem.status === 'DRAFT' || rowItem.status === 'DE_ACTIVE'  ? 'separated-row' : '';
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.order.locationName) {
            this.currentSearch += 'location|name$' + this.order.locationName + '&';
        }
        if (this.order.orderNo) {
            this.currentSearch += 'orderNo$' + this.order.orderNo + '&';
        }
        if (this.order.registerDate) {
            this.currentSearch += 'registerDate→' + this.order.registerDate.toISOString() + '&';
        }
        if (this.order.price) {
            this.currentSearch += 'price☼' + this.order.price + '&';
        }
        if (this.order.amount) {
            this.currentSearch += 'amount☼' + this.order.amount + '&';
        }
        if (this.order.status) {
            this.currentSearch += 'status#OrderStatus.' + this.order.status + '&';
        }
        if (this.order.orderType) {
            this.currentSearch += 'orderType#OrderType.' + this.order.orderType + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['boundary-sell'], {
            queryParams: {
                search: this.currentSearch,
                plaque: this.order.plaque,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(BoundarySellComponent.name, this.currentSearch);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.entities.boundarySell').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.registerChangeInOrders();

    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe('orderListModification', response => this.loadAll());
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

            this.router.navigate(['boundary-sell'], {
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
        this.orders = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
