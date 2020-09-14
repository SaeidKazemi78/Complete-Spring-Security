import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {BoundarySellReportService} from './boundary-sell-report.service';
import {BoundarySellReport, BoundarySellReportRequest} from './boundary-sell-report.model';
import {OrderType} from '../../../entities/order';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';
import {Principal} from 'app/shared';

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-sell-report.component.html'
})
export class BoundarySellReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellReports: BoundarySellReport[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BoundarySellReportRequest = new BoundarySellReportRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.boundarySellReports, this.state);
    OrderType = OrderType;
    customerTypes: CustomerType[] = [];
    orderTypeOptions = [];

    constructor(
        private boundarySellReportService: BoundarySellReportService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private principal: Principal
    ) {

        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSIT_DATA','ROLE_REPORT_ALL_DATA']).then(((value: boolean) => {
            if (value) {
                this.orderTypeOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSIT'),
                    value: 'BOUNDARY_TRANSIT'
                });
            }
        }));

        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSHIP_DATA','ROLE_REPORT_ALL_DATA']).then(((value: boolean) => {
            if (value) {
                this.orderTypeOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSHIP'),
                    value: 'BOUNDARY_TRANSHIP'
                });
            }
        }));
    }

    loadAll() {
        this.boundarySellReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundarySellReport[]>) => this.onSuccess(res.body),
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

    private onSuccess(data) {
        this.boundarySellReports = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = 10;
        this.state.skip = 0;
        this.gridData = process(this.boundarySellReports, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.state = this.req.state;
        this.gridData = process(this.boundarySellReports, state);

    }
}
