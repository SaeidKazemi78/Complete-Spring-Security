import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {OrderType} from '../../../entities/order';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';
import {DxDataGridComponent} from "devextreme-angular";
import {
    BoundaryHistoryEditCarTank,
    BoundaryHistoryEditCarTankRequest,
    BoundaryHistoryEditCarTankResponse
} from "app/reports/boundary-sell-reports/boundary-history-edit-car-tank/boundary-history-edit-car-tank.model";
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {BoundaryHistoryEditCarTankService} from "app/reports/boundary-sell-reports/boundary-history-edit-car-tank/boundary-history-edit-car-tank.service";
import {DateTimeJalaliPipe} from "app/shared/ng2-datetimepicker-jalali";
import {dateRangeValidation} from "app/shared/utils/utils";

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-history-edit-car-tank.component.html'
})
export class BoundaryHistoryEditCarTankComponent implements OnInit, OnDestroy {

    @ViewChild(DxDataGridComponent, {read: true}) dataGrid: DxDataGridComponent;

    currentAccount: any;
    boundaryHistoryEditCarTanks: BoundaryHistoryEditCarTank[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BoundaryHistoryEditCarTankRequest = new BoundaryHistoryEditCarTankRequest();
    OrderType = OrderType;
    customerTypes: CustomerType[] = [];
    totalCount: number;
    tasksDataSourceStorage: any[] = [];
    details: any[] = [];

    constructor(
        private boundarySellReportService: BoundaryHistoryEditCarTankService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService
    ) {
    }

    loadAll() {
        this.boundarySellReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundaryHistoryEditCarTankResponse>) => {
                this.boundaryHistoryEditCarTanks = res.body.customers;
                this.details = res.body.details;
                this.details.forEach(value => {
                    const date = new Date(Number(value.timestamp));
                    value.timestamp = new DateTimeJalaliPipe().transform(date);
                });
            },
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.boundarySell.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

        this.setBreadCrumb();
        this.loadCustomerTypes();
    }

    loadCustomerTypes() {
        this.customerTypeService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
            .subscribe(value => {
                this.customerTypes = value.body;
            });
    }

    ngOnDestroy() {
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    getTasks(key) {
        let item = this.tasksDataSourceStorage.find((i) => i.key === key);
        if (!item) {
            item = {
                key: key,
                dataSourceInstance: new DataSource({
                    store: new ArrayStore({
                        data: this.details,
                        key: "customerId"
                    }),
                    filter: ["customerId", "=", key]
                })
            };
            this.tasksDataSourceStorage.push(item)
        }
        return item.dataSourceInstance;
    }

    changeDate(mode: 'startDate' | 'finishDate') {
        if (this.req.startDate && this.req.finishDate) {
            const date = dateRangeValidation(this.req.startDate, this.req.finishDate, 30, mode);
            if (date) {
                if (mode === 'startDate') {
                    this.req.finishDate = date;
                } else {
                    this.req.startDate = date;
                }
            }
        }
    }
}
