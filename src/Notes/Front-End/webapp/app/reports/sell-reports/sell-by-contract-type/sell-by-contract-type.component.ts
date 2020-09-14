import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {SellByContractTypeService} from './sell-by-contract-type.service';
import {CustomerTypeService} from "app/entities/customer-type";
import {process, State} from '@progress/kendo-data-query';
import {ProductService} from 'app/entities/product';
import {DepotService} from 'app/entities/depot';
import {
    SellByContractTypeReport,
    SellByContractTypeReportRequest
} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.model";

@Component({
    selector: 'jhi-balance-aggregation-report-buy',
    templateUrl: './sell-by-contract-type.component.html'
})
export class SellByContractTypeComponent implements OnInit, OnDestroy {
    breadcrumbItems: any[];

    req: SellByContractTypeReportRequest = new SellByContractTypeReportRequest({});
    sellByContractTypeReport: SellByContractTypeReport [] = [];
    loading: boolean;
    state: State = {take: 100};
    cols: string[] = [];
    gridData: any = process(this.sellByContractTypeReport, this.state);
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];

    constructor(
        private sellByContractTypeService: SellByContractTypeService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private productService: ProductService,
        private depotService: DepotService,
    ) {

    }

    loadAll() {

        this.sellByContractTypeService.query(this.req).subscribe(
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
            this.breadcrumbItems.push({label: 'گزارش فروش بر اساس قرارداد'});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();

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
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.sellByContractTypeReport = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.sellByContractTypeReport.forEach(value => {
            value.contractType = this.translateService.instant('niopdcgatewayApp.ContractType.' + value.contractType);
            value.orderType = this.translateService.instant('niopdcgatewayApp.OrderStatus.' + value.orderType);
        });
        this.gridData = process(this.sellByContractTypeReport, this.state);
        this.loading = false;
    }


    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }


}
