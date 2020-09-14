import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ShiftWork} from './shift-work.model';
import {ShiftWorkService} from './shift-work.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {Location, LocationService} from '../location/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-shift-work',
    templateUrl: './shift-work.component.html'
})
export class ShiftWorkComponent implements OnInit, OnDestroy {

    currentAccount: any;
    shiftWorks: ShiftWork[];
    shiftWork: ShiftWork = new ShiftWork();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    eventSubscriber2: Subscription;
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
    refuelCenterId: number;
    type: string;
    location: Location;
    breadcrumbItems: any[];

    locations: Location[];
    isOpenShift: boolean;
    isRefuelCenter: boolean;

    constructor(
        private shiftWorkService: ShiftWorkService,
        private locationService: LocationService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.locationId = activatedRoute.snapshot.params['locationId'];
        this.refuelCenterId = activatedRoute.snapshot.params['refuelCenterId'];
        this.type = activatedRoute.snapshot.params['type'];

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
                    this.shiftWork[value[0]] = Number(value[1]);
                } else {
                    this.shiftWork[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.isRefuelCenter = !!this.refuelCenterId;

        if (!this.isRefuelCenter) {
            this.shiftWorkService.query(this.locationId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ShiftWork[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.shiftWorkService.findOpenShiftWork(this.locationId)
                .subscribe(value => {
                    this.isOpenShift = value.body.type !== 'CLOSE';
                });
        } else {
            this.shiftWorkService.queryForRefuelCenter(this.refuelCenterId, this.type, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ShiftWork[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.shiftWorkService.findOpenShiftWorkForRefuelCenter(this.refuelCenterId, this.type)
                .subscribe(value => {
                    this.isOpenShift = !value.body;
                });
        }

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['location/' + this.locationId + '/shift-work'], {
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
        if (this.shiftWork.fromDate) {
            this.currentSearch += 'fromDate→' + this.shiftWork.fromDate.toISOString() + '&';
        }
        if (this.shiftWork.toDate) {
            this.currentSearch += 'toDate→' + this.shiftWork.toDate.toISOString() + '&';
        }
        if (this.shiftWork.locationId) {
            this.currentSearch += 'location.id☼' + this.shiftWork.locationId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['location/' + this.locationId + '/shift-work'], {
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
        this.translateService.get('niopdcgatewayApp.shiftWork.home.locationTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.location.name})`,
                routerLink: ['/location/' + (this.location.level === 0 ? '' : this.location.locationId + '/sub-locations')]
            });
        });
        this.translateService.get('niopdcgatewayApp.shiftWork.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.locationService.query().subscribe(res => {
                this.locations = res.body;
            }
        );

        this.registerChangeInShiftWorks();

        this.locationService.find(this.locationId).subscribe(location => {
                this.location = location.body;
                this.setBreadCrumb();
            }
        );

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.eventSubscriber2);
    }

    trackId(index: number, item: ShiftWork) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    registerChangeInShiftWorks() {
        this.eventSubscriber = this.eventManager.subscribe('shiftWorkListModification', response => {
            this.loadAll();
        });

        this.eventSubscriber2 = this.eventManager.subscribe('gotoBoundaryOrder', respon => {
            this.gotoBoundaryOrder(respon.content);
        });

    }

    gotoBoundaryOrder(input) {
        const date = new Date(0);
        date.setUTCSeconds(input);
        setTimeout(i => {
            this.router.navigate(['/boundary-sell'], {
                queryParams: {
                    search: 'registerDate→' + date.toISOString()  + '&status#OrderStatus.DRAFT&orderType#OrderType.BOUNDARY_TRANSIT',
                    sort: 'registerDate,desc'
                }
            });
        }, 1000);
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
            this.reverse != reverse) {

            this.router.navigate(['location', this.locationId, 'shift-work'], {
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
        this.shiftWorks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
