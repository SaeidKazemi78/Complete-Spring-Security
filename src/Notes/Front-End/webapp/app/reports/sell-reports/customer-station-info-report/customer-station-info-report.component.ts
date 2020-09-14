import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';

import {ScriptService} from '../../../shared/script/script.service';
import {HttpErrorResponse} from '../../../../../../../node_modules/@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CustomerStationInfoReportService} from './customer-station-info-report.service';
import {_if} from 'rxjs/observable/if';

@Component({
    selector: 'jhi-order-report',
    templateUrl: './customer-station-info-report.component.html'
})
export class CustomerStationInfoReportComponent implements OnInit/*, OnDestroy */ {
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    breadcrumbItems: any[];
    id: number;
    json = {
        info: {},
        customer: {
            name: '',
            regsion: '',
            area: '',
            GSID: '',
            address: '',
            postalCode: ''
        },
        customerStationInfo: {
            stationType: '',
            hasBodyPump: '',
            hasCanopy: '',
            hasColumns: '',
            hasDispatching: '',
            hasKahab: '',
            hasWorkClothes: ''
        },
        person: {
            name: '',
            ceoName: '',
            stationPerson: '',
            stationPersonCode: '',
            code: '',
            economicCode: ''
        },
        nozzleProductCount: []
    };
    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private customerStationInfoService: CustomerStationInfoReportService
    ) {
        this.id = activatedRoute.snapshot.params['id'];
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customerStationInfo.home.title').subscribe(title => {
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

        this.customerStationInfoService.report(this.id)
            .subscribe(res => {
                    console.log(res.body);
                    this.json.customer.name = res.body.customerName;
                    this.json.customer.area = res.body.area;
                    this.json.customer.regsion = res.body.regsion;
                    this.json.customer.address = res.body.address;
                    this.json.customer.GSID = res.body.gsid;
                    this.json.customer.postalCode = res.body.postalCode;
                    const has = this.translateService.instant('niopdcgatewayApp.customerStationInfo.has');
                    const notHas = this.translateService.instant('niopdcgatewayApp.customerStationInfo.notHas');
                    this.json.customerStationInfo.hasBodyPump = res.body.hasBodyPump ? has : notHas;
                    this.json.customerStationInfo.hasCanopy = res.body.hasCanopy ? has : notHas;
                    this.json.customerStationInfo.hasBodyPump = res.body.hasBodyPump ? has : notHas;
                    this.json.customerStationInfo.hasWorkClothes = res.body.hasWorkClothes ? has : notHas;
                    this.json.customerStationInfo.hasKahab = res.body.hasKahab ? has : notHas;
                    this.json.customerStationInfo.hasDispatching = res.body.hasDispatching ? has : notHas;
                    this.json.customerStationInfo.hasColumns = res.body.hasColumns ? has : notHas;
                    this.json.person.ceoName = res.body.ceoName;
                    this.json.person.code = res.body.code;
                    this.json.person.economicCode = res.body.economicCode;
                    this.json.person.name = res.body.personName;
                    this.json.person.stationPerson = res.body.stationPerson;
                    this.json.person.stationPersonCode = res.body.stationPersonCode;

                    this.json.customerStationInfo.stationType = this.translateService.instant('niopdcgatewayApp.StationType.' + res.body.stationType);

                    this.json.nozzleProductCount = res.body.nozzleProductCounts;

                    this.json.nozzleProductCount.forEach(value => value.nozzleProductType = this.translateService.instant('niopdcgatewayApp.NozzleProductType.' + value.nozzleProductType));
                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/CustomerStationInfoReport.mrt');
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
                (res: HttpErrorResponse) => this.onError(res.message));

    }

    onError(any) {

    }
}
