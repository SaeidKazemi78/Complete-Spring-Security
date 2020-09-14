import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultService} from './request-test-result.service';
import {Principal} from '../../../shared/index';

import {OilTank, OilTankService} from '../oil-tank/.';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-request-test-result',
    templateUrl: './request-test-result.component.html'
})
export class RequestTestResultComponent implements OnInit, OnDestroy {

    currentAccount: any;
    requestTestResults: RequestTestResult[];
    requestTestResult: RequestTestResult = new RequestTestResult();
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
    basePath;

    oiltanks: OilTank[];
    refuelcenters: RefuelCenter[];
    mode: string;

    constructor(
        private requestTestResultService: RequestTestResultService,
        private oilTankService: OilTankService,
        private refuelCenterService: RefuelCenterService,
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
                    this.requestTestResult[value[0]] = Number(value[1]);
                } else {
                    this.requestTestResult[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.requestTestResultService.query(this.mode, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<RequestTestResult[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.requestTestResult = new RequestTestResult();
        this.router.navigate(['/request-test-result'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }
    _gePath(popup) {
        return  [...this.basePath, popup] ;
    }
    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.requestTestResult.productId) {
            this.currentSearch += 'productId☼' + this.requestTestResult.productId + '&';
        }
        if (this.requestTestResult.requestStatus) {
            this.currentSearch += 'requestStatus#RequestStatus.' + this.requestTestResult.requestStatus + '&';
        }
        if (this.requestTestResult.testResultRequestStatus) {
            this.currentSearch += 'testResult.requestStatus#RequestStatus.' + this.requestTestResult.testResultRequestStatus + '&';
        }
        if (this.requestTestResult.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.requestTestResult.oilTankId + '&';
        }
        if (this.requestTestResult.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.requestTestResult.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/request-test-result'], {
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
        this.translateService.get('niopdcgatewayApp.requestTestResult.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(value => {
            this.basePath = ['/', ...getPath(this.router, '/').pathParts];
        });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.params.subscribe(value => {
            this.mode = value['mode'];
            this.loadAll();
        });

        this.oilTankService.query().subscribe(
            (res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }
        );
        this.refuelCenterService.query().subscribe(
            (res: HttpResponse<RefuelCenter[]>) => {
                this.refuelcenters = res.body;
            }
        );

        this.registerChangeInRequestTestResults();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RequestTestResult) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInRequestTestResults() {
        this.eventSubscriber = this.eventManager.subscribe('requestTestResultListModification', response => this.loadAll());
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

            this.router.navigate(['/request-test-result'], {
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
        this.requestTestResults = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
