import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {CustomerReport, CustomerRequest} from './customer.model';
import {CustomerService} from './customer.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {CustomerType, CustomerTypeService} from '../../../entities/customer-type';
import {CustomerGroup} from '../../../entities/customer-type';

@Component({
    selector: 'jhi-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, OnDestroy {

    currentAccount: any;
    customer: CustomerReport[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: CustomerRequest = new CustomerRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.customer, this.state);

    buyGroups: any = [];
    depots: any;
    currencies: any;
    products: any;
    customertypes_all: CustomerType[];
    customertypes: CustomerType[];

    allLocations = true;

    CustomerGroup = CustomerGroup;
    loading: boolean;

    constructor(
        private customerService: CustomerService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.loading = true;
        if (this.allLocations) {
            this.req.locations = null;
        }
        this.customerService.query(this.req).subscribe(
            (res: HttpResponse<CustomerReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    onChangeCustomerGroup(value) {
        this.customertypes = this.customertypes_all.filter((value2, index, array) => this.req.customerGroup === null || value2.customerGroup === this.req.customerGroup);
        const customerType = this.customertypes.find((value2, index, obj) => value2.id === this.req.customerType);
        if (customerType == null) {
            this.req.customerType = null;
        }
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    ngOnInit() {
        this.setBreadCrumb();

        this.customerTypeService.query().subscribe(res => {
                this.customertypes_all = res.body;
                const find = this.customertypes_all.find((value, index, obj) => value.id === this.req.customerType);
                let customerGroup = null;
                if (find) {
                    customerGroup = find.customerGroup;
                }
                this.req.customerGroup = customerGroup;
                this.onChangeCustomerGroup(customerGroup);
            },res => this.onError(res.message));

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.loading = false;
        this.customer = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.customer, this.state);
    }

    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
