import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../shared';
import {Region, RegionService} from '../region/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Location, LocationService} from '../location/.';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CountryService} from '../country/country.service';
import {Country} from '../country/country.model';

@Component({
    selector: 'jhi-region',
    templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit, OnDestroy {

    regexCode = /^[\d]{0,4}$/;

    currentAccount: any;
    regions: Region[];
    region: Region = new Region();
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
    regionId: number;
    countryId: number;
    region2: Region;
    breadcrumbItems: any[];
    country: Country;

    constructor(private regionService: RegionService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private countryService: CountryService,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager,
                private locationService: LocationService) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

    }

    loadAll() {
        this.regionService.query(this.regionId, this.countryId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Region[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['/country/' + this.countryId + (this.regionId ? '/region/' + this.regionId + '/sub-region' : '/region')], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.region = new Region();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.region.name) {
            this.currentSearch += 'name$' + this.region.name + '&';
        }
        if (this.region.code) {
            this.currentSearch += 'code$' + this.region.code + '&';
        }
        if (this.region.globalCode) {
            this.currentSearch += 'globalCode$' + this.region.globalCode + '&';
        }

        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/country/' + this.countryId + (this.regionId ? '/region/' + this.regionId + '/sub-region' : '/region')], {
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
        if (this.countryId) {
            this.translateService.get('niopdcgatewayApp.region.home.countryTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + ((this.country) ? '(' + this.country.name + ')' : ''),
                    routerLink: ['/country']
                });
            });
        }
        if (this.region2) {
            this.translateService.get('niopdcgatewayApp.region.home.regionTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + ` (${this.region2.name})`, routerLink:
                        [(this.countryId) ? `/country/${this.countryId}/region` : `/region`]
                });
            });
        }
        this.translateService.get((this.region2 ? 'niopdcgatewayApp.region.home.title2' : 'niopdcgatewayApp.region.home.title')).subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInRegions();
        this.activatedRoute.params.subscribe(params => {
            this.currentSearch = params['search'] ? params['search'] : '';

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
                        this.region[value[0]] = Number(value[1]);
                    } else {
                        this.region[value[0]] = value[1];
                    }
                }
            }

            this.region2 = null;
            this.regions = null;
            if (params['regionId'] !== this.regionId) {
                this.regionId = params['regionId'];
                this.loadAll();
            }

            if (this.country !== params['countryId']) {
                this.countryId = params['countryId'];
                this.loadCountry();
            } else if (this.regionId) {
                this.loadParent();
            } else {
                this.setBreadCrumb();
            }

        });
    }

    loadCountry() {
        this.countryService.find(this.countryId).subscribe(res => {
            this.country = res.body;
            this.loadParent();
        });
    }

    loadParent() {
        if (!this.regionId) {
            this.setBreadCrumb();
        } else {
            this.regionService.find(this.regionId).subscribe(region => {
                    this.region2 = region.body;
                    this.setBreadCrumb();
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Region) {
        return item.id;
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe('regionListModification',response => this.loadAll());
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

            this.router.navigate(['/country/' + this.countryId + (this.regionId ? '/region/' + this.regionId + '/sub-region' : '/region')], {
                // this.router.navigate(['region', this.regionId, 'region'], {
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
        this.regions = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
