import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Order, OrderStatus} from './order.model';
import {OrderService} from './order.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {LocationService} from '../location/location.service';
import {CustomerService} from '../customer/customer.service';
import {PersonService} from '../person/person.service';
import {DepotService} from '../depot/depot.service';
import {BankTransactionService} from '../bank-transaction/bank-transaction.service';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-order-credit-not-deposited',
    templateUrl: './order-credit-not-deposited.component.html'
})
export class OrderCreditNotDepositedComponent implements OnInit, OnDestroy {

    currentAccount: any;
    orders: Order[];
    order: Order = new Order();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    isPayment: boolean;
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
    orderPayments: Order[];
    price: number;
    payId;
    payEnable;
    payStatus;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;

    constructor(private orderService: OrderService,
                private parseLinks: JhiParseLinks,
                private depotService: DepotService,
                private personService: PersonService,
                private customerService: CustomerService,
                private locationService: LocationService,
                private bankTransactionService: BankTransactionService,
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
        this.isPayment = activatedRoute.snapshot.data['isPayment'] ? activatedRoute.snapshot.data['isPayment'] : false;
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(OrderCreditNotDepositedComponent.name);
            if (searchHistory) {
                this.currentSearch = searchHistory.value;
            }
        }
        this.activatedRoute.queryParams.subscribe(value => {
            this.payId = value['payId'] ? value['payId'] : '';
        });

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
                this.order[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.orderService.queryByOrderCreditNotDeposited({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page ,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Order[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/order/credit-not-deposited'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.order = new Order();
        this.loadAll();
        this.searchHistoryService.clear(OrderCreditNotDepositedComponent.name);

    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.order.customerName) {
            this.currentSearch += 'customer|name$' + this.order.customerName + '&';
        }
        if (this.order.depotTitle) {
            this.currentSearch += 'depot|title$' + this.order.depotTitle + '&';
        }
        if (this.order.locationName) {
            this.currentSearch += 'location|name$' + this.order.locationName + '&';
        }
        if (this.order.personName) {
            this.currentSearch += 'person|fullName$' + this.order.personName + '&';
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
        if (this.order.productPrice) {
            this.currentSearch += 'productPrice☼' + this.order.productPrice + '&';
        }
        if (this.order.containerPrice) {
            this.currentSearch += 'containerPrice☼' + this.order.containerPrice + '&';
        }
        if (this.order.costPrice) {
            this.currentSearch += 'costPrice☼' + this.order.costPrice + '&';
        }
        if (this.order.expires) {
            this.currentSearch += 'expires☼' + this.order.expires + '&';
        }
        if (this.order.status) {
            this.currentSearch += 'status#OrderStatus.' + this.order.status + '&';
        }
        if (this.order.modifyStatusDate) {
            this.currentSearch += 'modifyStatusDate→' + this.order.modifyStatusDate.toISOString() + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/order/credit-not-deposited'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(OrderCreditNotDepositedComponent.name, this.currentSearch);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.order.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/order/credit-not-deposited']});
        });
        if (this.isPayment) {
            this.breadcrumbItems.push({label: 'پرداخت'});
        }
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInOrders();

        this.setBreadCrumb();
    }

    payment() {
        this.orderService.startBankTransactionforSingleOrders(this.orderPayments.map(value => value.id)).subscribe(res => {
            this.router.navigate(['/order/credit-not-deposited/payment'], {queryParams: {payId: res.body}});
        });
    }

    onPayStatus(status) {
        this.payStatus = status;
    }

    restartBankTransaction() {
        this.bankTransactionService.restartBankTransaction(this.payId).subscribe(res => {
            this.payId = res.body;
            this.router.navigate(['/order/credit-not-deposited/payment'], {queryParams: {payId: res.body}});
        });
    }

    onSelect(d1, d2) {
        if (this.orderPayments.length > 0) {
            this.price = this.orderPayments.map(value => value.price).reduce((sum, current) => sum + current);
        } else {
            this.price = 0;
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Order) {
        return item.id;
    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe('orderListModification',response => this.loadAll());
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

            this.router.navigate(['/order/credit-not-deposited'], {
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
