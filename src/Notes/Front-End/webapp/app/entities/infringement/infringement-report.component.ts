import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {FactorItemService} from '../factor-item';
import {ScriptService} from '../../shared/script/script.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ReceiptType} from '../order/order.model';
import {Principal} from '../../shared';
import {PlaqueFormatPipe} from '../../shared/plaque-pipe/plaque-pipe';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {InfringementService} from 'app/entities/infringement/infringement.service';

@Component({
    selector: 'jhi-infringement-report',
    templateUrl: './infringement-report.component.html'
})
export class InfringementReportComponent implements OnInit/*, OnDestroy */ {
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
    customerId: number;
    infringementId: number;
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
        // private orderService: OrderService,
        private infringementService: InfringementService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private factorItemService: FactorItemService,
    ) {
        this.infringementId = activatedRoute.snapshot.queryParams['id'];
        this.customerId = activatedRoute.snapshot.params['customerId'];
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customer.home.titleBoundary').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/customer', 'boundary-customer']});
        });
        this.translateService.get('niopdcgatewayApp.infringement.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/customer', 'boundary-customer', this.customerId , 'infringement']});
        });
        this.translateService.get('niopdcgatewayApp.infringement.home.report').subscribe(title => {
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

        this.infringementService.infringementReport(this.infringementId)
            .subscribe(res => {
                    console.log(res.body);

                    this.json.info = res.body;
                    const date = new Date(this.json.info['registerDate']);
                    this.json.info['date'] = new DateJalaliPipe().transform(this.json.info['registerDate']);
                    this.json.info['time'] = date.getHours() + ':' + date.getMinutes();
                    this.json.info['plaque'] = new PlaqueFormatPipe().transform(this.json.info['plaque']);
                    this.json.info['plaqueTwo'] = new PlaqueFormatPipe().transform(this.json.info['plaqueTwo']);
                    this.json.info['driverFullName'] = res.body.driverFirstName + ' ' + res.body.driverLastName;
                    this.json.info['ownerFullName'] = res.body.ownerFirstName + ' ' + res.body.ownerLastName;
                    this.translateService.get('niopdcgatewayApp.infringementType.' + res.body.infringementType).subscribe((title) => {
                        this.json.info['infringementType'] = title;
                        this.json.info['infringementNo'] = res.body.locationCode + '-' + res.body.id;
                        const report = new Stimulsoft.Report.StiReport();

                        report.loadFile('/content/mrt/Infringement-V1.mrt');

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
                    });

                },
                (res: HttpErrorResponse) => this.onError(res.error));

    }

    onError(error) {
        setTimeout(() => {
            this.router.navigate(['/customer', 'boundary-customer', this.customerId, 'infringement']);
        }, 2000);

    }
}
