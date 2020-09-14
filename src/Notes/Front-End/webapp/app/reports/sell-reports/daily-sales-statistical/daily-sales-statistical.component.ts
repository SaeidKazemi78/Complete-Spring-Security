import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DailySalesStatistical, DailySalesStatisticalRequest} from './daily-sales-statistical.model';
import {DailySalesStatisticalService} from './daily-sales-statistical.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {OrderStatus} from 'app/entities/order';
import { ReportType } from 'app/reports/boundary-sell-reports/boundary-sell-details-report';

@Component({
    selector: 'jhi-daily-sales-statistical',
    templateUrl: './daily-sales-statistical.component.html'
})
export class DailySalesStatisticalComponent implements OnInit, OnDestroy {

    currentAccount: any;
    dailySalesStatistical: DailySalesStatistical[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DailySalesStatisticalRequest = new DailySalesStatisticalRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.dailySalesStatistical, this.state);
    orderStatusOptions: any[] =[];
    buyGroups: any = [];
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    allBuyGroup = true;
    allProducts = true;
    allCustomers = true;
    allLocation = true;
    allRegions = true;
    OrderStatus = OrderStatus;
    loading: boolean;
    allStatus = true;
    ReportType = ReportType;
    constructor(
        private dailySalesStatisticalService: DailySalesStatisticalService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private productService: ProductService,
        private depotService: DepotService,
        private eventManager: JhiEventManager
    ) {
        for (const buyGroup in BuyGroup) {
            if (parseInt(buyGroup, 10) >= 0) {
                this.buyGroups.push({
                    label: this.translateService.instant('niopdcgatewayApp.BuyGroup.' + BuyGroup[buyGroup]),
                    value: BuyGroup[buyGroup]
                });
            }
        }
    }

    loadAll() {
        this.loading = true;
        if (this.allLocation) {
            this.req.locations = null;
        }
        if (this.allRegions) {
            this.req.regions = null;
        }
        this.dailySalesStatisticalService.query(this.req).subscribe(
            (res: HttpResponse<DailySalesStatistical[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.dailySalesStatistical.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        for(const status in OrderStatus){
            if(isNaN(parseInt(status, 10)) &&
                status != this.OrderStatus[OrderStatus.PAID_PUMP] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.TICKET] &&
                status != this.OrderStatus[OrderStatus.WAY_BILL] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.CUSTOMS_CONFIRM]){
                this.orderStatusOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderStatus.' + status),
                    value: status
                })
            }
        }
        if (!this.req.reportType) {
            this.req.reportType = this.ReportType[this.ReportType.PAYMENT_DATE];
        }
        this.setBreadCrumb();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body.map((p: Product) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));
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
        this.dailySalesStatistical = data;
        this.state = this.req.state;
        if (this.allCustomers) {
            this.req.customers = null;
        }
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allBuyGroup) {
            this.req.buyGroups = null;
        }
        if (this.allLocation) {
            this.req.locations = null;
        }
        if(this.allStatus){
            this.req.statuses = null;
        }
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.dailySalesStatistical, this.state);
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
