import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {DepotStatus, Order, OrderStatus} from './order.model';
import {OrderService} from './order.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {DepotService} from '../depot/depot.service';
import {Depot} from '../depot/depot.model';
import {Person} from '../person/person.model';
import {Customer} from '../customer/customer.model';
import {Location} from '../location/location.model';
import {PersonService} from '../person/person.service';
import {CustomerService} from '../customer/customer.service';
import {LocationService} from '../location/location.service';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-order',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {

    currentAccount: any;
    orders: Order[];
    order: Order = new Order();
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
    depots: Depot[];
    persons: Person[];
    customers: Customer[];
    locations: Location[];
    mode: string;
    OrderStatus = OrderStatus;
    DepotStatus = DepotStatus;
    basePath;

    constructor(private orderService: OrderService,
                private depotService: DepotService,
                private personService: PersonService,
                private customerService: CustomerService,
                private locationService: LocationService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                public route: ActivatedRoute,
                private eventManager: JhiEventManager,
                private _hotkeysService: HotkeysService,
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
            const searchHistory = this.searchHistoryService.get(OrderComponent.name);
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
            } else if (key.lastIndexOf('☫') > 0) { // between time
                value = key.split('☫');
            }

            if (value.length > 1) {
                this.order[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        if (this.mode !== 'airplane') {
            this.orderService.queryByMode(this.mode, {
                personName: this.order.personName,
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Order[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.orderService.queryAirplane({
                orderNo: this.order.orderNo,
                personName: this.order.personName,
                customerName: this.order.customerName,
                amount: this.order.amount,
                status: this.order.status,
                buyGroup: this.order.buyGroup,
                name: this.order.userFullName,
                unitTitle: this.order.unitTitle,
                productTitle: this.order.productTitle,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Order[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/order'], {
            queryParams: {
                mode: this.mode,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.order = new Order();
        this.loadAll();
        this.searchHistoryService.clear(OrderComponent.name);
    }

    statusRowSeparated(rowItem: Order) {
        return rowItem.status === 'DRAFT' ? 'separated-row' : '';
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.order.orderNo) {
            this.currentSearch += 'orderNo$' + this.order.orderNo + '&';
        }
        if (this.order.customerName) {
            this.currentSearch += 'customer|name$' + this.order.customerName + '&';
        }
        if (this.order.locationName) {
            this.currentSearch += 'location|name$' + this.order.locationName + '&';
        }
        if (this.order.registerDate) {
            console.log(this.order.registerDate);
            console.log(this.order.registerDate.toISOString());
            this.currentSearch += 'registerDate→' + this.order.registerDate.toISOString() + '&';
        }
        if (this.order.price) {
            this.currentSearch += 'price☼' + this.order.price + '&';
        }
        if (this.order.productPrice) {
            this.currentSearch += 'productPrice☼' + this.order.productPrice + '&';
        }
        if (this.order.containerPrice) {
            this.currentSearch += 'containerPrice☼' + this.order.containerPrice + '&';
        }
        if (this.order.costPrice) {
            this.currentSearch += 'costPrice☼' + this.order.costPrice + '&';
        }
        if (this.order.amount) {
            this.currentSearch += 'amount☼' + this.order.amount + '&';
        }
        if (this.order.expires) {
            this.currentSearch += 'expires☼' + this.order.expires + '&';
        }
        if (this.order.status) {
            this.currentSearch += 'status#OrderStatus.' + this.order.status + '&';
        }
        if (this.order.buyGroup) {
            this.currentSearch += 'buyGroup#BuyGroup.' + this.order.buyGroup + '&';
        }
        if (this.order.modifyStatusDate) {
            this.currentSearch += 'modifyStatusDate→' + this.order.modifyStatusDate.toISOString() + '&';
        }
        if (this.order.depotId) {
            this.currentSearch += 'depotId☼' + this.order.depotId + '&';
        }
        if (this.order.firstName) {
            this.currentSearch += 'user|firstName$' + this.order.firstName + '&';
        }
        if (this.order.lastName) {
            this.currentSearch += 'user|lastName$' + this.order.lastName + '&';
        }
        if (this.order.productTitle) {
            this.currentSearch += 'product|title$' + this.order.productTitle + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/order'], {
            queryParams: {
                mode: this.mode,
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(OrderComponent.name, this.currentSearch);
        this.loadAll();

    }

    setBreadCrumb() {
        let type = 'order';
        if (this.mode === 'airplane') {
            type = 'order_airplane';
        } else if (this.mode === 'export') {
            type = 'export';
        }
        this.translateService.get([
            'global.menu.home',
            'global.menu.sell.' + type
        ]).subscribe(result => {
            this.breadcrumbItems = [];
            this.breadcrumbItems.push({
                label: result['global.menu.home'], routerLink: ['/']
            });
            this.breadcrumbItems.push({
                label: result['global.menu.sell.' + type]
            });
        });
    }

    _gePath(popup) {
        return [...this.basePath, popup];
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(value => {
            this.basePath = ['/', ...getPath(this.router, '/').pathParts];

        });

        this.route.queryParams.subscribe(params => {
            this.mode = params['mode'];
            this.loadAll();
            this.setBreadCrumb();
            this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
                if (k === 'ins') {
                    this.router.navigate(['order/new'], {queryParams: {mode: this.mode}});
                    return false;
                }
            }));
        });

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        /*this.depotService.query()
            .subscribe((depot) => {
                this.depots = depot.body;
            });
        this.locationService.query()
            .subscribe((locations) => {
                this.locations = locations.body;
            });
        this.personService.query()
            .subscribe((persons) => {
                this.persons = persons.body;
            });
        this.customerService.query()
            .subscribe((customers) => {
                this.customers = customers.body;
            });*/

        this.registerChangeInOrders();

        this.setBreadCrumb();
    }

    print(id: number) {

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Order) {
        return item.id;
    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe('orderListModification', response => this.loadAll());
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

            this.router.navigate(['/order'], {
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
