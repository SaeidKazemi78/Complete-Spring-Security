import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Bill} from './bill.model';
import {BillService} from './bill.service';
import {ScriptService} from '../../shared/script/script.service';
import {HttpErrorResponse} from '@angular/common/http';

declare var Stimulsoft: any;

@Component({
    selector: 'jhi-bill-report',
    templateUrl: './bill-report.component.html'
})
export class BillReportComponent implements OnInit/*, OnDestroy */ {

    currentAccount: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    breadcrumbItems: any[];
    billId: number;
    json = {
        bill: null,
        billItems: null
    };

    report: any;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private billService: BillService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.billId = activatedRoute.snapshot.params['billId'];

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.bill.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/bill']});
        });
        this.translateService.get('niopdcgatewayApp.bill.home.report').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');

        this.billService.queryForReport(this.billId)
            .subscribe(billRes => {
                this.json = billRes.body;
                    this.showReport();
            });

    }

    showReport() {
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = false;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.exports.showExportToImagePng = true;
        options.exports.showExportToImageGif = true;
        options.exports.showExportToImageTiff = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        const d = new Date();
        const report = new Stimulsoft.Report.StiReport();
        report.loadFile('/content/mrt/Karmozd.mrt');
        const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
        let dateJalaliPipe = new DateJalaliPipe();
        this.json.bill.startDate = dateJalaliPipe.transform(this.json.bill.startDate);
        this.json.bill.finishDate = dateJalaliPipe.transform(this.json.bill.finishDate);
        this.json.bill.date = dateJalaliPipe.transform(this.json.bill.date);
        this.json.bill.createdDate = dateJalaliPipe.transform(this.json.bill.createdDate);
        const strJson = JSON.stringify(this.json);
        dataSet.readJson(strJson);
        report.dictionary.databases.clear();
        report.regData('Demo', 'Demo', dataSet);
        viewer.report = report;

        console.log('Rendering the viewer to selected element');
        viewer.renderHtml('viewer');
        this.setBreadCrumb();

    }

    onError(any) {
        this.router.navigate(['/bill']);
    }

}
