import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {BalanceAggregationService} from './balance-aggregation.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {CustomerGroup, CustomerTypeService} from "app/entities/customer-type";
import {BalanceAggregationReport, BalanceAggregationReportRequest} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.model';
import {Consumption, ConsumptionRequest} from 'app/reports/sell-reports/consumption/consumption.model';
import {process, State} from '@progress/kendo-data-query';
import {BuyGroup} from 'app/entities/buy-type';
import {OrderStatus} from 'app/entities/order';
import {ReportType} from 'app/reports/boundary-sell-reports/boundary-sell-details-report';
import {Product, ProductService} from 'app/entities/product';
import {Depot, DepotService} from 'app/entities/depot';

@Component({
    selector: 'jhi-balance-aggregation-report-buy',
    templateUrl: './balance-aggregation.component.html'
})
export class BalanceAggregationReportComponent implements OnInit, OnDestroy {
    breadcrumbItems: any[];

    req: BalanceAggregationReportRequest = new BalanceAggregationReportRequest({});
    balanceAggregationReport: BalanceAggregationReport [] = [];

    buyGroups: any = [];
    orderStatusOptions: any[] = []
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    allLocations = true;
    allRegions = true;
    allProducts = true;
    loading: boolean;
    allStatus = true;
    OrderStatus = OrderStatus;
    ReportType = ReportType;

    cols: string[] = [];


    constructor(
        private balanceAggregationService: BalanceAggregationService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private productService: ProductService,
        private depotService: DepotService,
    ) {
        for (const buyGroup in BuyGroup) {
            if (parseInt(buyGroup, 10) >= 0) {
                this.buyGroups.push({
                    label: this.translateService.instant('niopdcgatewayApp.BuyGroup.' + BuyGroup[buyGroup]),
                    value: BuyGroup[buyGroup]
                });
            }
        }

        for (const status in OrderStatus) {
            if (isNaN(parseInt(status, 10)) &&
                status != this.OrderStatus[OrderStatus.PAID_PUMP] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.TICKET] &&
                status != this.OrderStatus[OrderStatus.WAY_BILL] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.CUSTOMS_CONFIRM]) {
                this.orderStatusOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderStatus.' + status),
                    value: status
                })
            }
        }
    }

    loadAll() {
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        if (this.allRegions) {
            this.req.regions = null;
        }
        if (this.allStatus) {
            this.req.statuses = null;
        }
        this.loading = true;
        this.balanceAggregationService.query(this.req).subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.balanceAggregationReport.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        if (!this.req.reportType) {
            this.req.reportType = this.ReportType[this.ReportType.PAYMENT_DATE];
        }
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.setBreadCrumb();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body.map((p: Product) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body.map(p => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {


        this.loading = false;
        this.balanceAggregationReport = data;
        if (data && data.length && data.length > 0) {
            this.cols = Object.keys(data[0]).filter((value, index) => value !== 'totalCount' && value !== 'productTitle' && value!='productCode');
            this.balanceAggregationReport.forEach((row)=>{
                let sum = 0;
                this.cols.forEach((label)=>{
                    if(row[label]){
                        sum += row[label];
                    }else{
                        row[label] = 0;
                    }
                })
                row['totalCount'] = sum;
            })
        } else {
            this.cols = [];
        }


    }



    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }




}
