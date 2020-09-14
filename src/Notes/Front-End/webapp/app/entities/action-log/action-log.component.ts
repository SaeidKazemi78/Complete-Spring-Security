import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ActionLog, ActionLogRequest} from './action-log.model';
import {ActionLogService} from './action-log.service';
import {Principal} from '../../shared';
import {LazyLoadEvent} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-action-log',
    templateUrl: './action-log.component.html'
})
export class ActionLogComponent implements OnInit, OnDestroy {

    currentAccount: any;
    actionLogs: ActionLog[];
    actionLog: ActionLog = new ActionLog();
    actionLogRequest: ActionLogRequest = new ActionLogRequest();
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
    accessAdmin: boolean;

    constructor(
        private actionLogService: ActionLogService,
        private parseLinks: JhiParseLinks,
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
                this.actionLogs[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        if (!(this.actionLogRequest.startDate && this.actionLogRequest.finishDate && this.actionLogRequest.username)) {
            return;
        }
        this.actionLogService.query({
            startDate: this.actionLogRequest.startDate.toISOString(),
            finishDate: this.actionLogRequest.finishDate.toISOString(),
            username: this.actionLogRequest.username,
            url: this.actionLogRequest.url,
            locationIds: this.actionLogRequest.locationIds,
            remoteAddress: this.actionLogRequest.remoteAddress,
            roleName: this.actionLogRequest.roleName,
            showAll: this.actionLogRequest.showAll,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<ActionLog[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/action-log'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.actionLog.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.principal.hasAuthority('ROLE_ADMIN').then(value => {
            this.accessAdmin = value;
        });
        this.registerChangeInNews();

        this.setBreadCrumb();
        const dateNow = new Date();
        this.actionLogRequest.finishDate = new Date(dateNow);
        this.actionLogRequest.startDate = new Date(dateNow.setHours(dateNow.getHours() - 24));
        this.actionLogRequest.showAll = false;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ActionLog) {
        return item.id;
    }

    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe('actionLogListModification', response => this.loadAll());
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

            this.router.navigate(['/action-log'], {
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

    toggleShowAll() {
        this.actionLogRequest.showAll = !this.actionLogRequest.showAll;
    }

    private onSuccess(data, headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.actionLogs = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
