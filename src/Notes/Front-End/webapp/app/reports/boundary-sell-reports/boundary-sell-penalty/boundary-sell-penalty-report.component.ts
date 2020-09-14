import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {OrderType} from '../../../entities/order';
import {BoundarySellPenaltyReport} from './boundary-sell-penalty-report.model';
import {BoundarySellReportRequest} from '../boundary-sell';
import {BoundarySellPenaltyReportService} from './boundary-sell-penalty-report.service';
import {LocationService} from '../../../entities/location';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-sell-penalty-report.component.html'
})
export class BoundarySellPenaltyReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellPenaltyReports: BoundarySellPenaltyReport[] = [];
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
    gridData: any = process(this.boundarySellPenaltyReports, this.state);
    OrderType = OrderType;

    locations: any[];
    customLocation: any[];

    customerTypes: CustomerType[] | null;

    constructor(
        private boundarySellReportService: BoundarySellPenaltyReportService,
        private customerTypeService: CustomerTypeService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private locationService: LocationService,
        private translateService: TranslateService
    ) {
    }

    loadAll() {
        this.boundarySellReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundarySellPenaltyReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.reportBoundarySell.boundarySellPenaltyReport').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                // this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
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
        this.boundarySellPenaltyReports = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.skip = 0;
        this.state.take = 10;
        this.gridData = process(this.boundarySellPenaltyReports, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.state = this.req.state;
        this.gridData = process(this.boundarySellPenaltyReports, state);

    }
}
