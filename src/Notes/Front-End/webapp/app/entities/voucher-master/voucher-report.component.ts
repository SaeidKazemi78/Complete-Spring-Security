import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {VoucherItem, VoucherItemService} from '../voucher-item';
import {VoucherMaster} from './voucher-master.model';
import {VoucherMasterService} from './voucher-master.service';
import {ScriptService} from '../../shared/script/script.service';

declare var Stimulsoft: any;

@Component({
    selector: 'jhi-voucher-report',
    templateUrl: './voucher-report.component.html'
})
export class VoucherReportComponent implements OnInit/*, OnDestroy */ {

    currentAccount: any;
    voucherItems: VoucherItem[];
    voucherMaster: VoucherMaster = new VoucherMaster();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    breadcrumbItems: any[];
    voucherMasterId: number;
    json = {
        voucherMaster: {},
        voucherItems: []
    };

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private voucherMasterService: VoucherMasterService,
        private voucherItemService: VoucherItemService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.voucherMasterId = activatedRoute.snapshot.params['voucherMasterId'];

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.voucherMaster.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/voucher-master']});
        });
        this.translateService.get('report.print').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        const report = new Stimulsoft.Report.StiReport();

        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        const options = new Stimulsoft.Viewer.StiViewerOptions;
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;

        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);

        this.voucherMasterService.findForReport(this.voucherMasterId)
            .subscribe((voucherMasterRes) => {
                this.voucherMaster = voucherMasterRes.body;
                this.voucherItemService.queryForReport(this.voucherMasterId).subscribe((voucherItemRes) => {
                    const d = new Date();
                    this.voucherItems = voucherItemRes.body;
                    this.json.voucherMaster = this.voucherMaster;
                    this.json.voucherItems = this.voucherItems;
                    this.json.voucherMaster['printDate'] = new DateJalaliPipe().transform(d);
                    this.json.voucherMaster['printHour'] = d.getHours() + ':' + d.getMinutes();
                    this.json.voucherMaster['createdDate'] = new DateJalaliPipe().transform(this.json.voucherMaster['createdDate']);
                    this.json.voucherMaster['startDate'] = new DateJalaliPipe().transform(this.json.voucherMaster['startDate']);
                    this.json.voucherMaster['finishDate'] = new DateJalaliPipe().transform(this.json.voucherMaster['finishDate']);
                    this.json.voucherMaster['confirmDate'] = new DateJalaliPipe().transform(this.json.voucherMaster['confirmDate']);
                    this.json.voucherMaster['docDate'] = new DateJalaliPipe().transform(this.json.voucherMaster['docDate']);

                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/M41.mrt');
                    const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                    const strJson = JSON.stringify(this.json);
                    dataSet.readJson(strJson);
                    report.dictionary.databases.clear();
                    report.regData('Demo', 'Demo', dataSet);
                    viewer.report = report;

                    console.log('Rendering the viewer to selected element');
                    viewer.renderHtml('viewer');
                    this.setBreadCrumb();
                });
            });
    }
}
