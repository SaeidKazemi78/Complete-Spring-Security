import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementService} from './request-filter-element.service';
import {Principal} from '../../../shared/index';

import {RefuelCenter, RefuelCenterService} from '../refuel-center/.';
import {Filter, FilterService} from '../filter/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-request-filter-element',
    templateUrl: './request-filter-element.component.html'
})
export class RequestFilterElementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    requestFilterElements: RequestFilterElement[];
    requestFilterElement: RequestFilterElement = new RequestFilterElement();
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

    refuelcenters: RefuelCenter[];
    filters: Filter[];
    mode: string;

    constructor(
        private requestFilterElementService: RequestFilterElementService,
        private refuelCenterService: RefuelCenterService,
        private filterService: FilterService,
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
        this.mode = activatedRoute.snapshot.params['mode'];

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
                    this.requestFilterElement[value[0]] = Number(value[1]);
                } else {
                    this.requestFilterElement[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.requestFilterElementService.query(this.mode, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<RequestFilterElement[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    _gePath(popup) {
        return  [...this.basePath, popup] ;
    }
    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/request-filter-element'], {
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
        if (this.requestFilterElement.productId) {
            this.currentSearch += 'productId☼' + this.requestFilterElement.productId + '&';
        }
        if (this.requestFilterElement.amountOfFuelPassed) {
            this.currentSearch += 'amountOfFuelPassed☼' + this.requestFilterElement.amountOfFuelPassed + '&';
        }
        if (this.requestFilterElement.requestStatus) {
            this.currentSearch += 'requestStatus#RequestStatus.' + this.requestFilterElement.requestStatus + '&';
        }
        if (this.requestFilterElement.changeFilterElementRequestStatus) {
            this.currentSearch += 'changeFilterElement.requestStatus#RequestStatus.' + this.requestFilterElement.changeFilterElementRequestStatus + '&';
        }
        if (this.requestFilterElement.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.requestFilterElement.refuelCenterId + '&';
        }
        if (this.requestFilterElement.filterId) {
            this.currentSearch += 'filter.id☼' + this.requestFilterElement.filterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/request-filter-element'], {
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
        this.translateService.get('niopdcgatewayApp.requestFilterElement.home.title').subscribe(title => {
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

        this.registerChangeInRequestFilterElements();
        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RequestFilterElement) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackFilterById(index: number, item: Filter) {
        return item.id;
    }

    registerChangeInRequestFilterElements() {
        this.eventSubscriber = this.eventManager.subscribe('requestFilterElementListModification', response => this.loadAll());
        this.eventSubscriber = this.eventManager.subscribe('confirmFilterElementListModification', response => this.loadAll());
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

            this.router.navigate(['/request-filter-element'], {
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
        this.requestFilterElements = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
