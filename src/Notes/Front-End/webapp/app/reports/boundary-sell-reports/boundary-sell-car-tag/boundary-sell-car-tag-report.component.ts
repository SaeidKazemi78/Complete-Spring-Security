import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import {OrderType} from '../../../entities/order';
import {BoundarySellCarTagReport, BoundarySellCarTagRequest} from './boundary-sell-car-tag-report.model';
import {BoundarySellCarTagReportService} from './boundary-sell-car-tag-report.service';
import {LocationService} from '../../../entities/location';
import {JhiAlertService} from 'ng-jhipster';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {DateTimeJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali';

@Component({
    selector: 'jhi-boundary-sell-car-tag-report',
    templateUrl: './boundary-sell-car-tag-report.component.html'
})
export class BoundarySellCarTagReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    boundarySellReports: BoundarySellCarTagReport = new BoundarySellCarTagReport();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: BoundarySellCarTagRequest = new BoundarySellCarTagRequest();

    OrderType = OrderType;
    searching = false;
    locations: any[];
    customLocation: any[];
    carFIdDataSourceStorage: any[] = [];

    constructor(
        private boundarySellReportService: BoundarySellCarTagReportService,
        private locationService: LocationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private translateService: TranslateService
    ) {
    }

    loadAll() {
        if (this.req.plaqueModel) {
            this.req.plaque = this.req.plaqueModel.search;
        } else {
            this.req.plaque = null;
        }
        this.searching = true;
        this.boundarySellReportService.query(this.req).subscribe(
            (res: HttpResponse<BoundarySellCarTagReport>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    getDetails(key) {

        let item = this.carFIdDataSourceStorage.find((i) => i.key === key);
        if (!item) {
            item = {
                key: key,
                dataSourceInstance: new DataSource({
                    store: new ArrayStore({
                        data: [...this.boundarySellReports.details],
                        key: 'customerId'
                    }),
                    filter: ['customerId', '=', key]
                })
            };
            this.carFIdDataSourceStorage.push(item);
        }
        return item.dataSourceInstance;
    }


    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.reportBoundarySell.boundarySellCarTagReport').subscribe(title => {
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
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.searching = false;
        this.boundarySellReports = data;
        this.boundarySellReports.details.forEach(value => {
            if (value.createdDate) {
                value.createdDate = new DateTimeJalaliPipe().transform(value.createdDate);
            }
        });

    }

    private onError(error) {
        this.searching = false;
        this.jhiAlertService.error(error.message, null, null);
    }


}
