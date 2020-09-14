import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DailySalesSummary, DailySalesSummaryRequest} from './daily-sales-summary.model';
import {DailySalesSummaryService} from './daily-sales-summary.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {OrderStatus} from 'app/entities/order';
import { ReportType } from 'app/reports/boundary-sell-reports/boundary-sell-details-report';

@Component({
    selector: 'jhi-daily-sales-summary',
    templateUrl: './daily-sales-summary.component.html'
})
export class DailySalesSummaryComponent implements OnInit, OnDestroy {
    expand = true;
    currentAccount: any;
    dailySalesSummary: DailySalesSummary[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DailySalesSummaryRequest = new DailySalesSummaryRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.dailySalesSummary, this.state);

    buyGroups: any = [];
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    allLocations = true;
    allRegions = true;
    allProducts = true;
    allBuyGroups = true;
    loading = false;
    OrderStatus = OrderStatus;
    orderStatusOptions: any[] =[]
    allStatus = true;
    ReportType = ReportType;

    constructor(
        private dailySalesSummaryService: DailySalesSummaryService,
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
    }

    loadAll() {

        this.loading = true;
        if (this.allBuyGroups) {
            this.req.buyGroups = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allRegions) {
            this.req.regions = null;
        }
        if(this.allStatus){
            this.req.statuses = null;
        }
        this.dailySalesSummaryService.query(this.req).subscribe(
            (res: HttpResponse<DailySalesSummary[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.dailySalesSummary.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        if (!this.req.reportType) {
            this.req.reportType = this.ReportType[this.ReportType.PAYMENT_DATE];
        }
        this.req.date = new Date();
        this.req.date.setHours(0);
        this.req.date.setMinutes(0);
        this.req.date.setSeconds(0);
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
        this.dailySalesSummary = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.state.take ? this.state.take : 10;
        this.state.skip = this.state.skip ? this.state.skip : 0;
        this.gridData = process(this.dailySalesSummary, this.state);
        this.expand = this.dailySalesSummary.length < 1;
        this.loading = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        this.loading = false;
        this.expand = true;
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        if (this.loading) {
            return;
        }
        const isGroup = JSON.stringify(state.group) === JSON.stringify(this.req.state.group);
        const isSort = JSON.stringify(state.sort) === JSON.stringify(this.req.state.sort);
        if (isGroup && isSort) {
            this.req.state = this.state = state;
            this.gridData = process(this.dailySalesSummary, this.state);
        } else {
            this.req.state = state;
            this.loadAll();
        }
    }
}
