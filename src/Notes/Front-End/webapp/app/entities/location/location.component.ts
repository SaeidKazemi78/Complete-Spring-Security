import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Location} from './location.model';
import {LocationService} from './location.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnDestroy {

    regexCode = /^[\d]{0,4}$/;
    currentAccount: any;
    locations: Location[];
    location: Location = new Location();
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
    locationId: number;
    location0: Location;
    location1: Location;
    location2: Location;
    breadcrumbItems: any[];
    parentCode = '';

    constructor(
        private locationService: LocationService,
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
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        console.log('reverse', this.predicate);
    }

    loadAll() {
        this.locationService.query(this.locationId, this.location.name, this.location.code).subscribe(
            (res: HttpResponse<Location[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([this.locationId ? '/location/' + this.locationId + '/sub-locations' : '/location'], {
                queryParams: {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            }
        );
        this.location = new Location();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.location.name) {
            this.currentSearch += 'name$' + this.location.name + '&';
        }
        if (this.location.code) {
            this.currentSearch += 'code$' + this.location.code + '&';
        }
        if (this.location.financialCode) {
            this.currentSearch += 'financialCode$' + this.location.financialCode + '&';
        }
        if (this.location.costAccount) {
            this.currentSearch += 'costAccount$' + this.location.costAccount + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate([this.locationId ? '/location/' + this.locationId + '/sub-locations' : '/location'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.parentCode = '';
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.location0) {
            this.parentCode += this.location0.code;
            this.translateService.get('niopdcgatewayApp.location.home.title0').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.location0.name})`, routerLink: ['/location']});
            });

            if (this.location1) {
                this.parentCode += this.location1.code;
                this.translateService.get('niopdcgatewayApp.location.home.title1').subscribe(title => {
                    this.breadcrumbItems.push({
                        label: title + ` (${this.location1.name})`,
                        routerLink: ['/location/' + this.location0.id + '/sub-locations']
                    });
                });
                if (this.location2) {
                    this.parentCode += this.location2.code;
                    this.translateService.get('niopdcgatewayApp.location.home.title2').subscribe(title => {
                        this.breadcrumbItems.push({
                            label: title + ` (${this.location2.name})`,
                            routerLink: ['/location/' + this.location1.id + '/sub-locations']
                        });
                    });
                    this.translateService.get('niopdcgatewayApp.location.home.title3').subscribe(title => {
                        this.breadcrumbItems.push({label: title});
                    });
                } else {
                    this.translateService.get('niopdcgatewayApp.location.home.title2').subscribe(title => {
                        this.breadcrumbItems.push({label: title});
                    });
                }
            } else {
                this.translateService.get('niopdcgatewayApp.location.home.title1').subscribe(title => {
                    this.breadcrumbItems.push({label: title});
                });
            }
        } else {
            this.translateService.get('niopdcgatewayApp.location.home.title0').subscribe(title => {
                this.breadcrumbItems.push({label: title});
                this.activatedRoute.data['pageTitle'] = 'niopdcgatewayApp.location.home.title0';
            });
        }
    }

    ngOnInit() {
        // this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.params.subscribe(param => {

            this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ? this.activatedRoute.snapshot.queryParams['search'] : '';
            this.location = new Location();
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
                    this.location[value[0]] = value[1];
                }
            }

            this.locations = null;
            if (!param['locationId']) {
                this.loadAll();
            }
            if (param['locationId'] !== this.locationId) {
                this.locationId = param['locationId'];
                this.location0 = this.location1 = this.location2 = null;
                if (this.locationId) {
                    this.loadParent();
                }
                this.loadAll();
            } else {
                this.setBreadCrumb();
            }

        });
        this.registerChangeInLocations();
    }

    loadParent() {
        if (this.locationId) {
            this.locationService.find(this.locationId).subscribe(subParent => {
                if (subParent.body.level === 2) {
                    this.location2 = subParent.body;
                    this.locationService.find(this.location2.locationId).subscribe(parent => {
                        this.location1 = parent.body;
                        this.locationService.find(this.location1.locationId).subscribe(parent2 => {
                            this.location0 = parent2.body;
                            this.setBreadCrumb();
                        });
                    });
                } else if (subParent.body.level === 1) {
                    this.location1 = subParent.body;
                    this.locationService.find(this.location1.locationId).subscribe(parent => {
                        this.location0 = parent.body;
                        this.setBreadCrumb();
                    });
                } else if (subParent.body.level === 0) {
                    this.location0 = subParent.body;
                    this.setBreadCrumb();
                } else {
                    this.router.navigate([`/location`]);
                }
            });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Location) {
        return item.id;
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.loadAll());
    }

    sort() {
        console.log('reverse sort', this.reverse);

        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        console.log('reverse sort', this.reverse);
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

            this.router.navigate(this.locationId ? ['/location', this.locationId, 'sub-locations'] : ['/location'], {
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
        // this.links = this.parseLinks.parse(headers.get('link'));
        // this.totalItems = headers.get('X-Total-Count');
        // this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.locations = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
