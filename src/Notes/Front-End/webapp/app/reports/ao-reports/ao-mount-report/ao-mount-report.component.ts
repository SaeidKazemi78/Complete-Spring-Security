import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {AoMountReport, AoMountReportRequest} from './ao-mount-report.model';
import {AoMountReportService} from './ao-mount-report.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {RefuelCenterService} from '../../../entities/ao-entities/refuel-center/refuel-center.service';
import {RefuelCenter} from '../../../entities/ao-entities/refuel-center/refuel-center.model';
import {Person, PersonService} from '../../../entities/person';
import {Customer, CustomerService} from '../../../entities/customer';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Principal} from '../../../shared';
declare var Stimulsoft: any;

@Component({
    selector: 'jhi-ao-mount-report',
    templateUrl: './ao-mount-report.component.html'
})
export class AoMountReportComponent implements OnInit, OnDestroy {

    currentAccount: any;
    AoMountReport: AoMountReport[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AoMountReportRequest = new AoMountReportRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.AoMountReport, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    json = {
        aoMountReport: {}
    };

    constructor(
        private AoMountReportService: AoMountReportService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private principal: Principal,
        private customerService: CustomerService,
    ) {
    }

    loadAll() {

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        const options = new Stimulsoft.Viewer.StiViewerOptions;
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = false;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        this.AoMountReportService.query(this.req).subscribe(res => {
            const report = new Stimulsoft.Report.StiReport();
            report.loadFile('/content/mrt/aoMountReport.mrt');
            const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
            this.json.aoMountReport = res.body;
            // this.json.orderProducts = res.body;
            /*this.json.information = {
                printDate: new DateJalaliPipe().transform(new Date()),
                serialNumber: factor.factorNo,
                registerDate: new DateJalaliPipe().transform(factor.registerDate),
                fromDate: new DateJalaliPipe().transform(factor.startDate),
                toDate: new DateJalaliPipe().transform(factor.finishDate)
            };*/
            console.log(new DateJalaliPipe().transform(new Date()));
            const strJson = JSON.stringify(this.json);
            dataSet.readJson(strJson);
            report.dictionary.databases.clear();
            report.regData('Demo', 'Demo', dataSet);
            viewer.report = report;

            console.log('Rendering the viewer to selected element');
            viewer.renderHtml('viewer');
        });
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.aoMountReport.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
            }, res => this.onError(res.message));

        this.personService.query()
            .subscribe(res => {
                this.persons = res.body;
            }, res => this.onError(res.message));
        this.customerService.query()
            .subscribe(res => {
                this.customers = res.body;
            }, res => this.onError(res.message));

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

    /*private onSuccess(data) {
        this.AoMountReport = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.AoMountReport, this.state);
    }*/

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
