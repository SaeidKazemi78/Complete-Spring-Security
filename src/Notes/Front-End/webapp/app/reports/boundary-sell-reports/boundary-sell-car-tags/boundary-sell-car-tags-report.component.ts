import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import {OrderType} from '../../../entities/order';
import {BoundarySellCarTagsReport, BoundarySellCarTagsRequest} from './boundary-sell-car-tags-report.model';
import {BoundarySellCarTagsReportService} from './boundary-sell-car-tags-report.service';
import {LocationService} from '../../../entities/location';
import {JhiAlertService} from 'ng-jhipster';
import {process, State} from '@progress/kendo-data-query';

@Component({
    selector: 'jhi-boundary-sell-car-tags-report',
    templateUrl: './boundary-sell-car-tags-report.component.html'
})
export class BoundarySellCarTagsReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellReports: BoundarySellCarTagsReport [] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BoundarySellCarTagsRequest = new BoundarySellCarTagsRequest();
    state: State = {};
    gridData: any = process(this.boundarySellReports, this.state);

    OrderType = OrderType;
    searching = false;
    locations: any[];
    customLocation: any[];

    constructor(
        private boundarySellReportService: BoundarySellCarTagsReportService,
        private locationService: LocationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private translateService: TranslateService
    ) {
    }

    loadAll() {
        this.searching = true;
        this.boundarySellReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundarySellCarTagsReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.reportBoundarySell.boundarySellCarTagsReport').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setMonth(this.req.startDate.getMonth() - 1);

        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.setBreadCrumb();
        this.loadLocation();
    }
    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                this.customLocation = [];

                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }
    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.searching = false;

        this.boundarySellReports = data;
        this.gridData = process(this.boundarySellReports, this.state);
    }

    private onError(error) {
        this.searching = false;
        this.jhiAlertService.error(error.message, null, null);
    }

}
