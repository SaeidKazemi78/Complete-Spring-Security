import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {BaseTestResult} from './base-test-result.model';
import {BaseTestResultService} from './base-test-result.service';
import {Principal} from '../../../shared';
import {ParentBaseTestResult, ParentBaseTestResultService} from '../parent-base-test-result/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-base-test-result',
    templateUrl: './base-test-result.component.html'
})
export class BaseTestResultComponent implements OnInit, OnDestroy {

    currentAccount: any;
    baseTestResults: BaseTestResult[];
    baseTestResult: BaseTestResult = new BaseTestResult();
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
    parentBaseTestResultId: number;
    parentBaseTestResult: ParentBaseTestResult;
    breadcrumbItems: any[];

    constructor(
        private baseTestResultService: BaseTestResultService,
        private parentBaseTestResultService: ParentBaseTestResultService,
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
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.parentBaseTestResultId = activatedRoute.snapshot.params['parentBaseTestResultId'];

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
                    this.baseTestResult[value[0]] = Number(value[1]);
                } else {
                    this.baseTestResult[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.baseTestResultService.query(this.parentBaseTestResultId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<BaseTestResult[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['parent-base-test-result/' + this.parentBaseTestResultId + '/base-test-result'], {
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
        if (this.baseTestResult.property) {
            this.currentSearch += 'property$' + this.baseTestResult.property + '&';
        }
        if (this.baseTestResult.astm) {
            this.currentSearch += 'astm$' + this.baseTestResult.astm + '&';
        }
        if (this.baseTestResult.ip) {
            this.currentSearch += 'ip$' + this.baseTestResult.ip + '&';
        }
        if (this.baseTestResult.specification) {
            this.currentSearch += 'specification$' + this.baseTestResult.specification + '&';
        }
        if (this.baseTestResult.parentBaseTestResultId) {
            this.currentSearch += 'parentBaseTestResult.id☼' + this.baseTestResult.parentBaseTestResultId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['parent-base-test-result/' + this.parentBaseTestResultId + '/base-test-result'], {
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
        this.translateService.get('niopdcgatewayApp.baseTestResult.home.parentBaseTestResultTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/parent-base-test-result']});
        });
        this.translateService.get('niopdcgatewayApp.baseTestResult.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.parentBaseTestResultService.find(this.parentBaseTestResultId)
            .subscribe(res => {
                this.parentBaseTestResult = res.body;
                this.setBreadCrumb();
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.registerChangeInBaseTestResults();

        /* this.parentBaseTestResultService.find(this.parentBaseTestResultId).subscribe(
             (parentBaseTestResult) => {
                 this.parentBaseTestResult = parentBaseTestResult.body;
             }
         );*/
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BaseTestResult) {
        return item.id;
    }

    trackParentBaseTestResultById(index: number, item: ParentBaseTestResult) {
        return item.id;
    }

    registerChangeInBaseTestResults() {
        this.eventSubscriber = this.eventManager.subscribe('baseTestResultListModification',response => this.loadAll());
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

            this.router.navigate(['parent-base-test-result', this.parentBaseTestResultId, 'base-test-result'], {
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
        this.baseTestResults = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
