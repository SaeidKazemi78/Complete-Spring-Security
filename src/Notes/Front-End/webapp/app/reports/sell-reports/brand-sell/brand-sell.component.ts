import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {BrandSellService} from './brand-sell.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {CustomerTypeService} from '../../../entities/customer-type';
import {OrderStatus} from 'app/entities/order';
import {ReportType} from "app/reports/boundary-sell-reports/boundary-sell-details-report";
import {BrandSellRequest} from "app/reports/sell-reports/brand-sell/brand-sell.model";
import {ContractType, SellContractPerson} from "app/entities/sell-contract";
import {SellContractPersonService} from "app/entities/sell-contract/sell-contract-person.service";

@Component({
    selector: 'jhi-details-buy',
    templateUrl: './brand-sell.component.html'
})
export class BrandSellComponent implements OnInit, OnDestroy {

    currentAccount: any;
    detailsBuy: any[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BrandSellRequest = new BrandSellRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.detailsBuy, this.state);

    regions: any;
    allRegions = true;
    allStatus = true;
    allLocations = true;
    cols: string[] = [];
    OrderStatus = OrderStatus;
    orderStatusOptions: any[] = [];
    loading: boolean;
    ReportType = ReportType;
    sellContractPersons: SellContractPerson[] = [];
    ContractType = ContractType;

    constructor(
        private detailsBuyService: BrandSellService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private sellContractPersonService: SellContractPersonService,
        private eventManager: JhiEventManager
    ) {
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
        if (this.allRegions) {
            this.req.regions = null;
        }
        if (this.allStatus) {
            this.req.statuses = null;
        }
        this.loading = true;
        this.detailsBuyService.query(this.req).subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.brandSell.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        if (!this.req.reportType) {
            this.req.reportType = this.ReportType[this.ReportType.PAYMENT_DATE];
        }

        this.sellContractPersonService.queryByContractType(this.ContractType[this.ContractType.BRAND])
            .subscribe(value => {
                this.sellContractPersons = value.body;
            });

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
        this.detailsBuy = data;
        if (data && data.length && data.length > 0) {
            this.cols = Object.keys(data[0]).filter((value, index) => index > 3);
        } else {
            this.cols = [];
        }
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.detailsBuy, this.state);
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
