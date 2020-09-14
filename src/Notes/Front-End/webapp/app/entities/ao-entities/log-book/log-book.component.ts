import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {LogBook} from './log-book.model';
import {LogBookService} from './log-book.service';
import {Principal} from '../../../shared/index';
import {DayDepot, DayDepotService} from '../day-depot/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Order} from '../../order';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot';
import {MainDayOperation, MainDayOperationService} from '../main-day-operation';

@Component({
    selector: 'jhi-log-book',
    templateUrl: './log-book.component.html'
})
export class LogBookComponent implements OnInit, OnDestroy {

    currentAccount: any;
    logBooks: LogBook[];
    logBook: LogBook = new LogBook();
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
    dayDepotId: number;
    dayDepot: DayDepot;
    breadcrumbItems: any[];
    mainDayDepotId: number;
    mainDayDepot: MainDayDepot;
    mainDayOperationId: number;
    mainDayOperation: MainDayOperation;
    dayDepots: DayDepot[];

    constructor(
        private logBookService: LogBookService,
        private mainDayDepotService: MainDayDepotService,
        private mainDayOperationService: MainDayOperationService,
        private dayDepotService: DayDepotService,
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
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mainDayOperationId = activatedRoute.snapshot.params['mainDayOperationId'];
        this.logBook.status = null;

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
                    this.logBook[value[0]] = Number(value[1]);
                } else if (value[0] === 'status') {
                    this.logBook[value[0]] = Boolean(value[1]);
                } else {
                    this.logBook[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.logBookService.query(this.dayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<LogBook[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.mainDayDepotId) {
            this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/log-book', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot/' + this.dayDepotId + '/log-book', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.logBook = new LogBook();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.logBook.orderNo) {
            this.currentSearch += 'j_order|orderNo$' + this.logBook.orderNo + '&';
        }
        if (this.logBook.personTitle) {
            this.currentSearch += 'name-' + this.logBook.personTitle + '&';
        }
        if (this.logBook.customerTitle) {
            this.currentSearch += 'customer|name$' + this.logBook.customerTitle + '&';
        }
        if (this.logBook.amount) {
            this.currentSearch += 'amount☼' + this.logBook.amount + '&';
        }
        if (this.logBook.fuelType) {
            this.currentSearch += 'fuelType#FuelType.' + this.logBook.fuelType + '&';
        }
        if (this.logBook.status) {
            this.currentSearch += 'status;' + this.logBook.status + '&';
        }
        if (this.logBook.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.logBook.dayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.mainDayDepotId) {
            this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/log-book', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot/' + this.dayDepotId + '/log-book', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        const dateJalaliPipe = new DateJalaliPipe();
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.mainDayDepotId) {
            this.translateService.get('niopdcgatewayApp.mainDayDepot.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                    routerLink: ['/main-day-depot']
                });
            });

            this.translateService.get('niopdcgatewayApp.dayDepot.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + ` (${this.dayDepot.oilTankTitle})`,
                    routerLink: ['/main-day-depot', this.mainDayDepotId, 'day-depot']
                });
            });

        } else {

            this.translateService.get('niopdcgatewayApp.mainDayOperation.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayOperation.day)})`,
                    routerLink: ['/main-day-operation']
                });
            });

            this.translateService.get('niopdcgatewayApp.dayDepot.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + ` (${this.dayDepot.oilTankTitle})`,
                    routerLink: ['/main-day-operation', this.mainDayOperationId, 'day-depot']
                });
            });

        }

        this.translateService.get('niopdcgatewayApp.logBook.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInLogBooks();

        if (this.mainDayDepotId) {
            this.mainDayDepotService.find(this.mainDayDepotId)
                .subscribe((res: HttpResponse<MainDayDepot>) => {
                    this.mainDayDepot = res.body;
                    this.dayDepotService.find(this.dayDepotId).subscribe(
                        (dayDepot: HttpResponse<DayDepot>) => {
                            this.dayDepot = dayDepot.body;
                            this.setBreadCrumb();
                        }
                    );
                });
        } else {
            this.mainDayOperationService.find(this.mainDayOperationId)
                .subscribe(res => {
                    this.mainDayOperation = res.body;
                    this.dayDepotService.find(this.dayDepotId).subscribe(
                        (dayDepot: HttpResponse<DayDepot>) => {
                            this.dayDepot = dayDepot.body;
                            this.setBreadCrumb();
                        }
                    );
                });
        }

        if (this.mainDayDepotId) {
            this.dayDepotService.queryMainDayDepotId(this.mainDayDepotId)
                .subscribe(res => {
                    this.dayDepots = res.body;
                });
        } else {
            this.dayDepotService.queryMainDayOperationId(this.mainDayOperationId)
                .subscribe(res => {
                    this.dayDepots = res.body;
                });
        }

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LogBook) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackOrderById(index: number, item: Order) {
        return item.id;
    }

    registerChangeInLogBooks() {
        this.eventSubscriber = this.eventManager.subscribe('logBookListModification',response => this.loadAll());
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

            if (this.mainDayDepotId) {
                this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'log-book'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else {
                this.router.navigate(['main-day-operation', this.mainDayOperationId, 'day-depot', this.dayDepotId, 'log-book'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.logBooks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
