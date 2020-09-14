import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {MetreLog} from './metre-log.model';
import {MetreLogService} from './metre-log.service';
import {Principal} from '../../../shared/index';

import {Metre, MetreService} from '../metre/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {OilTank, OilTankService} from '../oil-tank';

@Component({
    selector: 'jhi-metre-log',
    templateUrl: './metre-log.component.html'
})
export class MetreLogComponent implements OnInit, OnDestroy {

    currentAccount: any;
    metreLogs: MetreLog[];
    metreLog: MetreLog = new MetreLog();
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

    metres: Metre[];
    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    oiltanks: OilTank[];
    oilTankId: number;
    metreId: number;
    startTime: any;
    endTime: any;

    constructor(private metreLogService: MetreLogService,
                private metreService: MetreService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private refuelCenterService: RefuelCenterService,
                private oilTankService: OilTankService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
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
                    this.metreLog[value[0]] = Number(value[1]);
                } else {
                    this.metreLog[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.metreId && this.startTime && this.endTime) {
            this.metreLogService.queryByFilter(this.metreId, this.startTime, this.endTime, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<MetreLog[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.metreId) {
            this.metreLogService.queryByMetre(this.metreId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<MetreLog[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/metre-log'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.metreLog = new MetreLog();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.metreLog.startMeter) {
            this.currentSearch += 'startMeter☼' + this.metreLog.startMeter + '&';
        }
        if (this.metreLog.endMeter) {
            this.currentSearch += 'endMeter☼' + this.metreLog.endMeter + '&';
        }
        if (this.metreLog.amount) {
            this.currentSearch += 'amount☼' + this.metreLog.amount + '&';
        }
        if (this.metreLog.registerDate) {
            this.currentSearch += 'registerDate→' + this.metreLog.registerDate + '&';
        }
        if (this.metreLog.fuelType) {
            this.currentSearch += 'fuelType#FuelType.' + this.metreLog.fuelType + '&';
        }
        if (this.metreLog.metreId) {
            this.currentSearch += 'metre.id☼' + this.metreLog.metreId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
        this.router.navigate(['/metre-log'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.metreLog.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
            },res => this.onError(res.message));

        this.registerChangeInMetreLogs();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MetreLog) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    registerChangeInMetreLogs() {
        this.eventSubscriber = this.eventManager.subscribe('metreLogListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    onChangeRefuelCenter(data) {

        this.metreLogs = [];
        this.oilTankId = null;
        this.metreId = null;
        this.metreLog.metreId = null;

        this.oilTankService.queryByRefuelCenterByUnitPlatform(data)
            .subscribe(res => {
                this.oiltanks = res.body;
            },res => this.onError(res.message));

    }

    onChangeOilTank(data) {

        this.metreLogs = [];
        this.metreId = null;
        this.metreLog.metreId = null;
        this.oilTankId = data;

        this.metreService.query(data, null).subscribe(res => {
                this.metres = res.body;
            }
        );
    }

    onMetreChange(data) {
        this.metreId = data;
        this.metreLogs = [];

        this.loadAll();
        /*if (this.startTime && this.endTime && data) {
            this.metreLogService.queryByFilter(data, this.startTime, this.endTime)
                .subscribe(res => {
                    this.metreLogs = res.body;
                });
        }*/
    }

    changeStartTime(date) {
        this.startTime = date;
        console.log(date);
        this.metreLogs = [];
        if (this.endTime && this.metreId && date) {
            this.onMetreChange(this.metreId);
        }
    }

    changeEndTime(date) {
        this.endTime = date;
        console.log(date);
        this.metreLogs = [];
        if (this.startTime && this.metreId && date) {
            this.onMetreChange(this.metreId);
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
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

            this.router.navigate(['/metre-log'], {
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
        this.metreLogs = data.sort((a, b) => {
            return a.registerDate - b.registerDate;
        });
        for (let i = 0; i < this.metreLogs.length - 1; i++) {
            const metreLogOne = this.metreLogs[i];
            const metreLogTwo = this.metreLogs[i + 1];

            if (i === 0) {
                metreLogOne.difference = 0;
            }

            metreLogTwo.difference = (metreLogTwo.startMeter && metreLogTwo.endMeter
                && metreLogOne.startMeter && metreLogOne.endMeter) ? metreLogTwo.startMeter - metreLogOne.endMeter : 0;
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
