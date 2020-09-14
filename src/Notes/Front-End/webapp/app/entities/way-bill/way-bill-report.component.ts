import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../shared/script/script.service';
import {WayBillService} from './way-bill.service';

@Component({
    selector: 'jhi-way-bill-report',
    templateUrl: './way-bill-report.component.html'
})
export class WayBillReportComponent implements OnInit/*, OnDestroy */ {
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
    orderId: number;
    json = {
        data: {}
    };
    id: number;
    report: any;
    mode: string;
    again: boolean;
    mainDayDepotId: number;
    dayDepotId: number;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private wayBilllService: WayBillService
    ) {
        this.id = activatedRoute.snapshot.params['id'];
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.wayBill.home.title').subscribe(title => {
            this.breadcrumbItems.push({
                label: title,
                routerLink: ['/main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'way-bill', 'send']
            });
        });
        this.translateService.get('niopdcgatewayApp.order.home.report').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
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
        this.wayBilllService.getReport(this.id)
            .subscribe(value => {
                this.json.data = value.body;

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/WayBill.mrt');
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

        /* this.orderService.boundaryReport(this.orderId)
             .subscribe((res) => {
                     console.log(res.body);
                     /!*this.json.orders = res.body;
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
                     });*!/
                     this.json.info = res.body.info;
                     this.json.info['dateen'] = new DatePipe('en-US').transform(this.json.info['date'], 'yyyy/MM/dd');
                     this.json.info['date'] = new DateJalaliPipe().transform(this.json.info['date']);
                     this.json.info['again'] = this.again ? 'چاپ مجدد' : '';

                     this.json.orderProducts = res.body.orderProducts;
                     const report = new Stimulsoft.Report.StiReport();
                     report.loadFile('/content/mrt/BoundaryReport.V14.mrt');
                     const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                     const strJson = JSON.stringify(this.json);
                     dataSet.readJson(strJson);
                     report.dictionary.databases.clear();
                     report.regData('Demo', 'Demo', dataSet);
                     viewer.report = report;

                     console.log('Rendering the viewer to selected element');
                     viewer.renderHtml('viewer');
                     this.setBreadCrumb();
                 },
                 (res: HttpErrorResponse) => this.onError(res.message));*/

    }

    onError(any) {
        this.router.navigate(['/boundary-sell']);
    }
}
