import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-order-report',
    templateUrl: './cleaning-report-oil-tank-print.component.html'
})
export class CleaningReportOilTankPrintComponent implements OnInit/*, OnDestroy */ {
    cleaningReportOilTankId: number;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private cleaningReportOilTankService: CleaningReportOilTankService,
        private translateService: TranslateService,
    ) {
        this.cleaningReportOilTankId = activatedRoute.snapshot.params['id'];
    }

    async ngOnInit() {
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        this.cleaningReportOilTankService.print(this.cleaningReportOilTankId)
            .subscribe(res => {
                    console.log(res.body);
                    /*this.json.orders = res.body;
                    let totalAmount = 0;
                    this.json.orders.forEach((value) => {
                        if (value.amountType !== this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT]) {
                            totalAmount += value.amount;
                        }
                    });
                    this.json.orders.forEach((value) => {
                        value.exportDate = new DateJalaliPipe().transform(value.exportDate);
                        value.startShift = new DateJalaliPipe().transform(value.startShift);
                        value.tankType = this.translateService.instant('niopdcgatewayApp.TankType.' + value.tankType);
                        if (value.endShift) {
                            value.endShift = new DateJalaliPipe().transform(value.endShift);
                        }
                        value.totalAmount = totalAmount;
                    });*/
                    const json = {info: null};
                    json.info = res.body;
                    // this.json.info['dateen'] = new DatePipe('en-US').transform(this.json.info['date'], 'yyyy/MM/dd');
                    // this.json.info['date'] = new DateJalaliPipe().transform(this.json.info['date']);
                    // this.json.info['again'] = this.again ? 'چاپ مجدد' : '';

                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/CleaningReportOilTank.mrt');
                    const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                    const strJson = JSON.stringify(json);
                    dataSet.readJson(strJson);
                    report.dictionary.databases.clear();
                    report.regData('Demo', 'Demo', dataSet);
                    viewer.report = report;

                    console.log('Rendering the viewer to selected element');
                    viewer.renderHtml('viewer');
                },
                (res: HttpErrorResponse) => this.onError(res.message));

    }

    onError(any) {
        this.router.navigate(['/boundary-sell']);
    }
}
