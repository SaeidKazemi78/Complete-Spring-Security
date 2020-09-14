import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {ScriptService} from '../../../shared/script/script.service';
import {HttpErrorResponse} from '../../../../../../../node_modules/@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {ClosedSalesReportService} from './closed-sales-report.service';
import {process, State} from '@progress/kendo-data-query';
import {ClosedSale, ClosedSaleRequest} from './closed-sales.model';
import {HttpResponse} from '@angular/common/http';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';

@Component({
    selector: 'jhi-closed-sales-report',
    templateUrl: './closed-sales-report.component.html'
})
export class ClosedSalesReportComponent implements OnInit, AfterViewInit {
    error: any;
    success: any;
    eventSubscriber: Subscription;
    closedSales: ClosedSale  [] = [];
    req: ClosedSaleRequest = new ClosedSaleRequest();
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    state: State = {take: 10};
    gridData: any = process(this.closedSales, this.state);
    breadcrumbItems: any[];
    showGrid = false;
    json = {
        info: {},

    };
    loading: boolean;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private closedSalesReportService: ClosedSalesReportService
    ) {
    }

    ngAfterViewInit(): void {
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.closedSales.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    loadAll() {
        this.showGrid = false;
        this.loading = true;
        this.closedSalesReportService.report(this.req).subscribe(
            (res: HttpResponse<ClosedSale[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    async ngOnInit() {
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.setBreadCrumb();
        this.loadAll();
    }

    private onSuccess(data) {
        this.loading = false;
        if (data && data.length && data.length > 0) {
            this.showGrid = true;
        }
        this.gridData = data;
    }

    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.loadAll();
    }

}
