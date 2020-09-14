import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {BoundarySellShiftReportService} from './boundary-sell-shift-report.service';
import {BoundarySellShiftReport, BoundarySellShiftRequest} from './boundary-sell-shift-report.model';
import {LocationService} from '../../../entities/location';
import {CustomerGroup} from '../../../entities/customer-type/customer-type.model';
import {ProductService} from '../../../entities/product';

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-sell-shift-report.component.html'
})
export class BoundarySellShiftReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellShiftReports: BoundarySellShiftReport[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BoundarySellShiftRequest = new BoundarySellShiftRequest({});
    aggregates: any[] = [
        {field: 'count', aggregate: 'sum'},
        {field: 'amount', aggregate: 'sum'},
        {field: 'price', aggregate: 'sum'}
    ];
    total: any = aggregateBy(this.boundarySellShiftReports, this.aggregates);
    state: State = {take: 10};
    gridData: any = process(this.boundarySellShiftReports, this.state);

    locations: any[];
    customLocation: any[];

    CustomerGroup = CustomerGroup;
    customProducts: any[];
    selectedProduct: any;
    products: any[];

    constructor(
        private boundarySellShiftReportService: BoundarySellShiftReportService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private locationService: LocationService,
        private productService: ProductService
    ) {
    }

    loadAll() {
        this.boundarySellShiftReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundarySellShiftReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.reportBoundarySell.boundarySellShiftReport').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.loadLocation();
        this.loadProducts();

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

    loadProducts() {
        this.productService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
            .subscribe(res => {
                this.products = res.body;
                const product = {
                    value: '',
                    label: ''
                };
                this.customProducts = [];
                this.customProducts.push(product);
                for (let i = 0; i < this.products.length; i++) {
                    this.customProducts.push({
                        value: this.products[i].id,
                        label: this.products[i].title
                    });
                }
            },res => this.onError(res.message));
    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }

    private onSuccess(data) {
        this.boundarySellShiftReports = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = 10;
        this.state.skip = 0;
        this.total = aggregateBy(this.boundarySellShiftReports, this.aggregates);
        this.gridData = process(this.boundarySellShiftReports, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.state = this.req.state;
        this.gridData = process(this.boundarySellShiftReports, state);

    }
}
