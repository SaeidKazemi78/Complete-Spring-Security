import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';

import {CustomerGroup, CustomerTypeService} from '../../../entities/customer-type';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Principal, User} from '../../../shared';
import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {DateTimeJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali';
import {Location, LocationService} from '../../../entities/location';
import {InvoiceRequestDTO, ReportResponseDTO} from './invoice-report.model';
import {InvoiceSellReportService} from './invoice-report.service';
import {NumberToPersianPipe} from '../../../shared/number-to-persian-pipe/number-to-persian.pipe';

@Component({
    selector: 'jhi-invoice-sell-report',
    templateUrl: './invoice-report.component.html'
})
export class InvoiceSellReportComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    req: InvoiceRequestDTO = new InvoiceRequestDTO({});
    customerTypes: any[];
    breadcrumbItems: any[];
    locations: Location[];
    customLocation: any[];
     dataList: any[];
    json = {
        items: [],
        info: {
     startDate: null,
     finishDate: null,
     date: null,
     orderNo: null,
     invoiceNumber: null,
     customerAccount: null,
     customerName: null,
     locationName: null,
     issueDate: null,
     exitDate: null,
     totalAmountP: null,
     totalAmount: null,
     totalPrice: null,
     totalPriceP: null,
     username: null
        }
    };

    mode: string;
    user: User;
    CustomerGroup = CustomerGroup;
    loading: boolean;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private invoiceSellReportService: InvoiceSellReportService,

    ) {
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });

        this.translateService.get('niopdcgatewayApp.invoiceSell.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {

        this.principal.identity().then(value => {
            this.user = value;
        });
        this.setBreadCrumb();

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.endDate = new Date();
        this.req.endDate.setHours(23);
        this.req.endDate.setMinutes(59);
        this.req.endDate.setSeconds(59);

        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);

    }

    report() {
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/B Mitra Bold_0.ttf', 'B Mitra Bold');

        this.loading = true;
        this.invoiceSellReportService.query(this.req)
            .subscribe(res => {
                this.loading = false;
                console.log(res.body);
               this.dataList = [];

                res.body.dataList.forEach(value => {
                   value['startDate'] = new DateTimeJalaliPipe().transform(this.req.startDate);
                   value['finishDate'] = new DateTimeJalaliPipe().transform(this.req.endDate);
                   value['date'] = new DateJalaliPipe().transform(res.body.info.date);
                   value.issueDate = new DateJalaliPipe().transform(value.issueDate);
                   value.exitDate = new DateJalaliPipe().transform(value.exitDate);
                   value.totalAmountP = new NumberToPersianPipe().transform(value.totalAmount);
                   value.totalPriceP = new NumberToPersianPipe().transform(value.price);
                   value.username = this.user.login;
                    this.dataList.push(value);
                 });

                if (this.dataList.length && this.dataList.length > 0) {
                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/invoice.v1.mrt');
                    const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
                    const strJson = JSON.stringify(this.dataList);
                    console.log(strJson);
                    dataSet.readJson(strJson);
                    report.dictionary.databases.clear();
                    report.regData('DataSet', 'DataSet', dataSet);
                    viewer.report = report;

                    console.log('Rendering the viewer to selected element');
                    viewer.renderHtml('viewer');
                    this.setBreadCrumb();
                }

            });
    }

    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }

}
