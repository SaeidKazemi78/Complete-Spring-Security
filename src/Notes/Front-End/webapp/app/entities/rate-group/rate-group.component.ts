import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {RateGroup, RateGroupObject} from './rate-group.model';
import {RateGroupService} from './rate-group.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-rate-group',
    templateUrl: './rate-group.component.html'
})
export class RateGroupComponent implements OnInit, OnDestroy {

    currentAccount: any;
    rateGroups: RateGroup[];
    rateGroup: RateGroup = new RateGroup();
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
    locationTitle: string;
    rateGroupObject: RateGroupObject = new RateGroupObject();

    constructor(private rateGroupService: RateGroupService,
                private parseLinks: JhiParseLinks,
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
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        debugger;
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(RateGroupComponent.name);
            if (searchHistory) {
                this.rateGroupObject = searchHistory.value;
            }
        }
        this.currentSearch = activatedRoute.snapshot.queryParams['search'];
        this.currentSearch = this.currentSearch ? this.currentSearch : '';
        if (this.currentSearch === '') {
            this.currentSearch = localStorage.getItem('rate-group-search');
            this.currentSearch = this.currentSearch ? this.currentSearch : '';
        }
        this.locationTitle = this.rateGroupObject.locationTitle;// localStorage.getItem('rate-group-search-location');
        this.rateGroup.title = this.rateGroupObject.title;
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
                    this.rateGroup[value[0]] = Number(value[1]);
                }
            } else {
                this.rateGroup[value[0]] = value[1];
            }
        }

    }

    loadAll() {
        localStorage.setItem('rate-group-search-location', this.locationTitle);
        this.rateGroupService.query({
            locationTitle: this.rateGroupObject.locationTitle,
            title: this.rateGroupObject.title,
            type: this.rateGroupObject.type,
            archive: this.rateGroupObject.archive,
            page: this.rateGroupObject.page,
            size: this.rateGroupObject.size,
            sort: this.rateGroupObject.sort
        }).subscribe(
            (res: HttpResponse<RateGroup[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.locationTitle = '';
        this.router.navigate(['/rate-group'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.rateGroup = new RateGroup();
        this.searchHistoryService.clear(RateGroupComponent.name);
        this.loadAll();

    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.rateGroup.title) {
            this.currentSearch += 'title$' + this.rateGroup.title + '&';
        }
        if (this.rateGroup.type) {
            this.currentSearch += 'type#RateGroupType.' + this.rateGroup.type + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        localStorage.setItem('rate-group-search', this.currentSearch);

        this.router.navigate(['/rate-group'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.rateGroupObject = {
            archive: this.rateGroup.archive,
            type: this.rateGroup.type,
            title: this.rateGroup.title,
            locationTitle: this.locationTitle,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.searchHistoryService.setObject(RateGroupComponent.name, this.rateGroupObject);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.rateGroup.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInRateGroups();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RateGroup) {
        return item.id;
    }

    registerChangeInRateGroups() {
        this.eventSubscriber = this.eventManager.subscribe('rateGroupListModification', response => this.loadAll());
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

            this.router.navigate(['/rate-group'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });

            this.rateGroupObject = {
                archive: this.rateGroup.archive,
                type: this.rateGroup.type,
                title: this.rateGroup.title,
                locationTitle: this.locationTitle,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            };
        }

        this.loadAll();
    }

    setRateGroupTableRowStyle(rateGroup: RateGroup) {
        return 'text-left';
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.rateGroups = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
