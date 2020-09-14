import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {OrderType} from '../../../entities/order';
import {BoundarySellMultipleTrafficReport} from './boundary-sell-multiple-traffic-report.model';
import {BoundarySellReportRequest} from '../boundary-sell';
import {BoundarySellMultipleTrafficReportService} from './boundary-sell-multiple-traffic-report.service';
import {LocationService} from '../../../entities/location';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-sell-multiple-traffic-report.component.html'
})
export class BoundarySellMultipleTrafficReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellMultipleTrafficReports: BoundarySellMultipleTrafficReport[] = [];
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
    gridData: any = process(this.boundarySellMultipleTrafficReports, this.state);
    OrderType = OrderType;

    locations: any[];
    customLocation: any[];
    customerTypes: CustomerType[] | null;

    constructor(
        private boundarySellReportService: BoundarySellMultipleTrafficReportService,
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
            (res: HttpResponse<BoundarySellMultipleTrafficReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.reportBoundarySell.boundarySellMultipleTrafficReport').subscribe(title => {
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
        this.boundarySellMultipleTrafficReports = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = 10;
        this.state.skip = 0;
        this.gridData = process(this.boundarySellMultipleTrafficReports, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.state = this.req.state;
        this.gridData = process(this.boundarySellMultipleTrafficReports, state);

    }
}
