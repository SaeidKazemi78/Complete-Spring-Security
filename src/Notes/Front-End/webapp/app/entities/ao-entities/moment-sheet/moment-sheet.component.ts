import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../../shared/index';
import {LazyLoadEvent} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {MomentSheet} from './moment-sheet.model';
import {MomentSheetService} from './moment-sheet.service';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';

@Component({
    selector: 'jhi-moment-sheep',
    templateUrl: './moment-sheet.component.html'
})
export class MomentSheetComponent implements OnInit, OnDestroy {

    currentAccount: any;
    momentSheets: MomentSheet[];
    momentSheet: MomentSheet = new MomentSheet();
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
    refuelCenterId: number;
    startTime: any;
    endTime: any;
    refuelCenters: RefuelCenter[];

    constructor(
        private momentSheetService: MomentSheetService,
        private parseLinks: JhiParseLinks,
        private refuelCenterService: RefuelCenterService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private dataUtils: JhiDataUtils,
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
                this.momentSheets[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        if (this.refuelCenterId && this.startTime && this.endTime) {
            this.momentSheetService.queryByFilterDay(this.refuelCenterId, this.startTime, this.endTime)
                .subscribe(
                    (res: HttpResponse<MomentSheet[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/moment-sheets'], {
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
        /* if (this.news.title) {
             this.currentSearch += 'title$' + this.news.title + '&';
         }
         if (this.news.summary) {
             this.currentSearch += 'summary$' + this.news.summary + '&';
         }
         if (this.news.startDate) {
             this.currentSearch += 'startDate→' + this.news.startDate.toISOString() + '&';
         }
         if (this.news.finishDate) {
             this.currentSearch += 'finishDate→' + this.news.finishDate.toISOString() + '&';
         }
         if (this.news.content) {
             this.currentSearch += 'content$' + this.news.content + '&';
         }
         if (this.news.newsType) {
             this.currentSearch += 'newsType#NewsType.' + this.news.newsType + '&';
         }
         if (this.currentSearch.length > 0) {
             this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
         }*/

        this.router.navigate(['/moment-sheets'], {
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
        this.translateService.get('niopdcgatewayApp.momentSheet.home.title').subscribe(title => {
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
            });

        this.registerChangeInNews();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MomentSheet) {
        return item.oilTankId;
    }

    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe('momentSheetsListModification',response => this.loadAll());
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

            this.router.navigate(['/moment-sheets'], {
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

    changeRefuelCenter(data) {
        this.startTime = null;
        this.endTime = null;
        this.refuelCenterId = data;
        this.momentSheets = [];
    }

    changeStartTime(data) {
        this.startTime = data;
        this.momentSheets = [];
        if (this.refuelCenterId && this.endTime) {
            this.loadAll();
        }
    }

    changeEndTime(data) {
        this.endTime = data;
        this.momentSheets = [];
        if (this.refuelCenterId && this.startTime) {
            this.loadAll();
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private onSuccess(data, headers) {
        /*this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;*/
        // this.page = pagingParams.page;
        this.momentSheets = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
