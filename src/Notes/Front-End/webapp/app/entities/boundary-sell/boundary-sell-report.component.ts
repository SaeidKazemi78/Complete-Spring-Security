import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {PersonService} from '../person';
import {FactorItemService} from '../factor-item';
import {OrderService} from '../order/order.service';
import {ScriptService} from '../../shared/script/script.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ReceiptType} from '../order/order.model';
import {Principal} from '../../shared';
import {NumberToPersianPipe} from '../../shared/number-to-persian-pipe/number-to-persian.pipe';
import {PlaqueFormatPipe} from '../../shared/plaque-pipe/plaque-pipe';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    selector: 'jhi-order-report',
    templateUrl: './boundary-sell-report.component.html'
})
export class BoundarySellReportComponent implements OnInit/*, OnDestroy */ {
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
    receiptType = ReceiptType;
    json = {
        info: {},
        orderProducts: []

    };

    report: any;
    mode: string;
    again: boolean;
    type: any;

    constructor(
        private orderService: OrderService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private personService: PersonService,
        private factorItemService: FactorItemService,
    ) {
        this.orderId = activatedRoute.snapshot.params['orderId'];
        this.mode = activatedRoute.snapshot.params['mode'];
        this.again = activatedRoute.snapshot.queryParams['again'];
        this.type = activatedRoute.snapshot.queryParams['type'];

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.order.home.boundarySell').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/boundary-sell']});
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
        options.exports.showExportToExcel = false;
        options.exports.showExportToExcel2007 = false;
        options.exports.showExportToExcelXml = false;
        options.exports.showExportToWord2007 = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        this.orderService.boundaryReport(this.orderId, this.type)
            .subscribe(res => {
                    console.log(res.body);

                    this.json.info = res.body.info;
                    const date = new Date(this.json.info['date']);
                    this.json.info['dateen'] = new DatePipe('en-US').transform(this.json.info['date'], 'yyyy/MM/dd');
                    this.json.info['date'] = new DateJalaliPipe().transform(this.json.info['date']);
                    this.json.info['time'] = date.getHours() + ':' + date.getMinutes();
                    this.json.info['again'] = this.again ? 'چاپ مجدد' : '';
                    this.json.info['totalAmountA'] = new NumberToPersianPipe().transform(this.json.info['totalAmount']);
                    this.json.info['realAmountA'] = new NumberToPersianPipe().transform(this.json.info['realAmount']);
                    this.json.info['plaque'] = new PlaqueFormatPipe().transform(this.json.info['plaque']);
                    this.json.info['plaqueTwo'] = new PlaqueFormatPipe().transform(this.json.info['plaqueTwo']);
                    this.json.orderProducts = res.body.orderProducts;
                    if (this.json.info['iranian']) {
                        this.json.orderProducts.forEach((orderProduct) => {
                            orderProduct.bakType = this.translateService.instant(`niopdcgatewayApp.TankType.${orderProduct.bakType}`);
                        });
                    }

                    const report = new Stimulsoft.Report.StiReport();

                    switch (this.type) {
                        case this.receiptType[ReceiptType.ARCHIVES] :
                            report.loadFile('/content/mrt/BoundaryReportArchive-v5.mrt');
                            break;
                        case this.receiptType[ReceiptType.CUSTOMER] :

                            if (this.json.info['iranian']) {
                                report.loadFile('/content/mrt/BoundaryReportDriverIranian-v5.mrt');
                            } else {
                                report.loadFile('/content/mrt/BoundaryReportDriver-v7.mrt');
                            }

                            break;
                        case this.receiptType[ReceiptType.CUSTOMHOUSE] :
                            report.loadFile('/content/mrt/BoundaryReportCoustomHose-v5.mrt');
                            break;
                        default:
                            if (this.json.info['iranian']) {
                                report.loadFile('/content/mrt/BoundaryReportDriverIranian-v5.mrt');
                            } else {
                                report.loadFile('/content/mrt/BoundaryReportDriver.v7.mrt');
                            }

                    }

                    const dataSet = new Stimulsoft.System.Data.DataSet('Demo');

                    const strJson = JSON.stringify(this.json);
                    console.log(strJson);
                    dataSet.readJson(strJson);
                    report.dictionary.databases.clear();
                    report.regData('Demo', 'Demo', dataSet);
                    viewer.report = report;

                    console.log('Rendering the viewer to selected element');
                    viewer.renderHtml('viewer');
                    this.setBreadCrumb();
                },
                (res: HttpErrorResponse) => this.onError(res.error));

    }

    onError(error) {
        setTimeout(() => {
            this.router.navigate(['/boundary-sell']);
        }, 2000);

    }
}
