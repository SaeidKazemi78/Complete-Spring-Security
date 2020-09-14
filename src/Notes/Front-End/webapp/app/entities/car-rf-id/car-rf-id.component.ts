import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CarRfId} from './car-rf-id.model';
import {CarRfIdService} from './car-rf-id.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {Customer, CustomerService} from '../customer/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Location, LocationService} from 'app/entities/location';

@Component({
    selector: 'jhi-car-rf-id',
    templateUrl: './car-rf-id.component.html'
})
export class CarRfIdComponent implements OnInit, OnDestroy {

    currentAccount: any;
    carRfIds: CarRfId[];
    carRfId: CarRfId = new CarRfId();
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
    customerId: number;
    locationId: number;
    customer: Customer;
    location: Location;
    breadcrumbItems: any[];

    constructor(
        private carRfIdService: CarRfIdService,
        private customerService: CustomerService,
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
        this.customerId = activatedRoute.snapshot.params['customerId'];
        this.locationId = activatedRoute.snapshot.params['locationId'];
        this.carRfId.active = null;

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
                    this.carRfId[value[0]] = Number(value[1]);
                } else if (value[0] === 'active') {
                    this.carRfId[value[0]] = Boolean(value[1]);
                } else {
                    this.carRfId[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.carRfIdService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            customerId: this.customerId !== undefined ? this.customerId : null,
            locationId: this.locationId !== undefined ? this.locationId : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CarRfId[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        let url = 'customer/boundary-customer/' + this.customerId + '/car-rf-id';
        if (this.locationId) {
            url = 'location/' + this.locationId + '/car-rf-id';
        }
        this.router.navigate([url], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.carRfId = new CarRfId();
        this.carRfId.active = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.carRfId.code) {
            this.currentSearch += 'code$' + this.carRfId.code.toUpperCase() + '&';
        }
        if (this.carRfId.active) {
            this.currentSearch += 'active;' + this.carRfId.active + '&';
        }
        if (this.carRfId.customerId) {
            this.currentSearch += 'customer.id☼' + this.carRfId.customerId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }
        let url = 'customer/boundary-customer/' + this.customerId + '/car-rf-id';
        if (this.locationId) {
            url = 'location/' + this.locationId + '/car-rf-id';
        }
        this.router.navigate([url], {
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
        if (this.customerId) {
            this.translateService.get('niopdcgatewayApp.carRfId.home.customerTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ' ( ' + this.customer.customPlaque.plaque + ' )', routerLink: ['/customer/boundary-customer']});
            });
        } else {
            this.translateService.get('niopdcgatewayApp.carRfId.locationTitle').subscribe(title => {
                this.breadcrumbItems.push({label: title + ' ( ' + this.location.name + ' )', routerLink: ['/location', this.location.locationId, 'sub-locations']});
            });
        }

        this.translateService.get('niopdcgatewayApp.carRfId.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCarRfIds();

        if (this.customerId) {

            this.customerService.find(this.customerId).subscribe(customer => {
                    this.customer = customer.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.locationId) {
            this.locationService.find(this.locationId).subscribe(location => {
                this.location = location.body;
                this.setBreadCrumb();
            });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CarRfId) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    registerChangeInCarRfIds() {
        this.eventSubscriber = this.eventManager.subscribe('carRfIdListModification', response => this.loadAll());
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

            let url = 'customer/boundary-customer/' + this.customerId + '/car-rf-id';
            if (this.locationId) {
                url = 'location/' + this.locationId + '/car-rf-id';
            }
            this.router.navigate([url], {
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
        this.carRfIds = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
