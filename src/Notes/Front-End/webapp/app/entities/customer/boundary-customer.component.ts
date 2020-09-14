import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Customer} from './customer.model';
import {CustomerService} from './customer.service';
import {Principal} from '../../shared';

import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {VehicleModelType} from '../vehicle-model';
import {SearchHistoryService} from 'app/shared/hotkey/search-history/search-history.service';

@Component({
    selector: 'jhi-boundary-customer',
    templateUrl: './boundary-customer.component.html'
})
export class BoundaryCustomerComponent implements OnInit, OnDestroy {
    plaque = {plaque: null, plaqueCode: null, search: ''};
    customers: Customer[];
    customer: Customer = new Customer();
    error: any;
    currentAccount: any;
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
    types: CustomerType[];
    CustomerGroup = CustomerGroup;
    VehicleModelType = VehicleModelType;
    plaqueCustomSearch = false;
    typeCode: string;
    customerTypes: CustomerType[] = [];

    constructor(private customerService: CustomerService,
                private typeService: CustomerTypeService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager,
                private customerTypeService: CustomerTypeService,
                private searchHistoryService: SearchHistoryService
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        if (!this.currentSearch) {
            const searchHistory = this.searchHistoryService.get(BoundaryCustomerComponent.name);
            if (searchHistory) {
                this.currentSearch = searchHistory.value;
            }
        }
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
                    this.customer[value[0]] = Number(value[1]);
                } else {
                    this.customer[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.customerService.queryForCars({
            vehicleModel: this.customer.vehicleModelTitle,
            archive: this.customer.archive === undefined ? null : this.customer.archive,
            carRfId: this.customer.carRfId,
            plaque: this.plaque ? this.plaque.search : undefined,
            type: this.customer.typeTitle,
            page: this.page,
            size: this.itemsPerPage,
            typeCode: this.typeCode,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Customer[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.plaque = {plaque: '', plaqueCode: '', search: ''};
        this.plaqueCustomSearch = false;
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/customer', 'boundary-customer'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.customer = new Customer();
        this.customer.buyOneToMany = null;
        this.loadAll();
        this.searchHistoryService.clear(BoundaryCustomerComponent.name);

    }

    loadCustomerTypes() {
        this.customerTypeService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.BOUNDARY])
            .subscribe(value => {
                this.customerTypes = value.body;
            });
    }

    search() {
        this.changeCustomerType();
        this.page = 0;
        this.currentSearch = '';

        if (this.customer.plaque) {
            this.currentSearch += 'plaque$' + this.customer.plaque + '&';
        }
        if (this.customer.carRfId) {
            this.currentSearch += 'carRfId$' + this.customer.carRfId.toUpperCase() + '&';
        }
        if (this.customer.archive !== undefined) {
            this.currentSearch += 'archive$' + this.customer.archive + '&';
        }
        if (this.customer.vehicleModelTitle) {
            this.currentSearch += 'vehicleModel.title$' + this.customer.vehicleModelTitle + '&';
        }

        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/customer', 'boundary-customer'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.searchHistoryService.set(BoundaryCustomerComponent.name, this.currentSearch);
        this.loadAll();
    }

    changeCustomerType() {
        if (this.customer.typeTitle) {
            this.typeCode = this.customerTypes.find(value => value.title === this.customer.typeTitle).code;
        }
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customer.home.titleBoundary').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.typeService.query().subscribe(res => {
                this.types = res.body;
            }
        );

        this.registerChangeInCustomers();

        this.setBreadCrumb();
        this.loadCustomerTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Customer) {
        return item.id;
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('customerListModification', response => this.loadAll());
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

            this.router.navigate(['/customer', 'boundary-customer'], {
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
        this.customers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
