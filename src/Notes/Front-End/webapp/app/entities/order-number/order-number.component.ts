import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {OrderNumber} from './order-number.model';
import {OrderNumberService} from './order-number.service';
import {Principal} from '../../shared';
import {Location, LocationService} from '../location/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';

@Component({
    selector: 'jhi-order-number',
    templateUrl: './order-number.component.html'
})
export class OrderNumberComponent implements OnInit, OnDestroy {

    currentAccount: any;
    orderNumbers: OrderNumber[];
    orderNumber: OrderNumber = new OrderNumber();
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
    refuelCenterId: number;
    location: Location;
    refuelCenter: RefuelCenter;
    breadcrumbItems: any[];

    constructor(
        private orderNumberService: OrderNumberService,
        private locationService: LocationService,
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
        this.locationId = activatedRoute.snapshot.params['locationId'];
        this.refuelCenterId = activatedRoute.snapshot.params['refuelCenterId'];
        this.orderNumber.active = null;

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
                if (value[0] === 'active') {
                    this.orderNumber[value[0]] = Boolean(value[1]);
                } else {
                    this.orderNumber[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        const params = {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        (this.refuelCenterId ?
            this.orderNumberService.queryByRefuelCenterId(this.refuelCenterId, params) :
            this.orderNumberService.queryByLocationId(this.locationId, params))
            .subscribe(
                (res: HttpResponse<OrderNumber[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(this.locationId ?
            ['location/' + this.locationId + '/order-number'] :
            ['refuel-center/' + this.locationId + '/fuel-receipt-number'], {
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
        if (this.orderNumber.startOrderNumber) {
            this.currentSearch += 'startOrderNumber☼' + this.orderNumber.startOrderNumber + '&';
        }
        if (this.orderNumber.endOrderNumber) {
            this.currentSearch += 'endOrderNumber☼' + this.orderNumber.endOrderNumber + '&';
        }
        if (this.orderNumber.currentOrderNumber) {
            this.currentSearch += 'currentOrderNumber☼' + this.orderNumber.currentOrderNumber + '&';
        }
        if (this.orderNumber.active) {
            this.currentSearch += 'active;' + this.orderNumber.active + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(this.locationId ?
            ['location/' + this.locationId + '/order-number'] :
            ['refuel-center/' + this.locationId + '/fuel-receipt-number'], {
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
        if (this.location) {
            this.translateService.get('niopdcgatewayApp.orderNumber.home.locationTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.location.name})`, routerLink: this.location.level === 0 ? ['/location'] : ['/location', this.location.locationId, 'sub-locations']});
            });
        } else if (this.refuelCenter) {
            this.translateService.get('niopdcgatewayApp.fuelReceiptNumber.home.refuelCenterTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ` (${this.refuelCenter.persianTitle})`, routerLink: ['/refuel-center']});
            });
        }
        this.translateService.get('niopdcgatewayApp.orderNumber.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInOrderNumbers();
        if (this.locationId) {
            this.locationService.find(this.locationId).subscribe(
                (location: HttpResponse<Location>) => {
                    this.location = location.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.refuelCenterId) {
            this.refuelCenterService.find(this.refuelCenterId).subscribe(
                (refuelCenter: HttpResponse<RefuelCenter>) => {
                    this.refuelCenter = refuelCenter.body;
                    this.setBreadCrumb();
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderNumber) {
        return item.id;
    }

    registerChangeInOrderNumbers() {
        this.eventSubscriber = this.eventManager.subscribe('orderNumberListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.orderNumbers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
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

            this.router.navigate(this.locationId ?
                ['location/' + this.locationId + '/order-number'] :
                ['refuel-center/' + this.locationId + '/fuel-receipt-number'], {
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

}
