import {Component, OnInit} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';
import {Location, LocationService} from '../../../entities/location';
import {TranslateService} from '@ngx-translate/core';
import {Principal, User} from '../../../shared';
import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';

import {DateTimeJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali';
import {RateGroupService} from '../../../entities/rate-group';
import {RateGroupReportService} from './rate-group-report.service';
import {RateGroupReportRequest} from './rate-group-report.model';
import {Product, ProductService} from '../../../entities/product';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    selector: 'jhi-rate-group-report',
    templateUrl: './rate-group-report.component.html'
})
export class RateGroupReportComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    req: RateGroupReportRequest = new RateGroupReportRequest();
    locations: Location[];
    products: Product[];
    customLocation: any[];
    customProduct: any[];
    breadcrumbItems: any[];
    customProducts: any[];
    selectedProduct: any;
    rateGroups: any[];
    customRateGroups: any[];

    json = {
        data: [],
        info: {
            date: null,
            area: null,
            zone: null,
            boundary: null,
            fromDate: null,
            toDate: null,
            username: null,
            customerTitle: null
        }
    };

    mode: string;
    user: User;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private rateGroupService: RateGroupService,
        private rateGroupReportService: RateGroupReportService,
    private locationService: LocationService,
    private productService: ProductService

    ) {
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.reportRateGroup.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.principal.identity().then(value => {
            this.user = value;
        });
        this.setBreadCrumb();
        this.loadProduct();
        this.loadLocation();

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);

    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;

                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];

                this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }

    loadProduct() {
        this.productService.query('')
            .subscribe(value => {
                this.products = value.body;

                const location = {
                    value: '',
                    label: ''
                };
                this.customProduct = [];

                this.customProduct.push(location);
                for (let i = 0; i < this.products.length; i++) {
                    this.customProduct.push({
                        value: this.products[i].id,
                        label: this.products[i].title
                    });
                }
            });
    }

    loadRateGroups() {
        this.rateGroupService.query('')
            .subscribe(value => {
                this.rateGroups = value.body;

                const group = {
                    value: '',
                    label: ''
                };
                this.customRateGroups = [];

                this.customRateGroups.push(location);
                for (let i = 0; i < this.rateGroups.length; i++) {
                    this.customRateGroups.push({
                        value: this.rateGroups[i].id,
                        label: this.rateGroups[i].name
                    });
                }

            });
    }

    report() {
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = true;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/B Mitra Bold_0.ttf', 'B Mitra Bold');

        this.rateGroupReportService.query(this.req)
            .subscribe(res => {
                console.log(res.body);
                this.json.info.date = new DateTimeJalaliPipe().transform(res.body.info.date);
                this.json.data = res.body.dataList;
                this.json.data.forEach(value => {
                    value.createdDate = new DateTimeJalaliPipe().transform(value.createdDate);
                    value.startDate = new DateTimeJalaliPipe().transform(value.startDate);
                    value.finshDate = new DateTimeJalaliPipe().transform(value.finishDate);
                });

                this.json.info.fromDate = new DateJalaliPipe().transform(this.req.startDate);
                this.json.info.toDate = new DateJalaliPipe().transform(this.req.finishDate);
                this.json.info.username = this.user.login;

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/rateGroupReport.v1.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
                const strJson = JSON.stringify(this.json);
                dataSet.readJson(strJson);
                report.dictionary.databases.clear();
                report.regData('DataSet', 'DataSet', dataSet);
                viewer.report = report;

                console.log('Rendering the viewer to selected element');
                viewer.renderHtml('viewer');
                this.setBreadCrumb();
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
