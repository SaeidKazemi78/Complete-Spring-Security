import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {PersonService} from '../person';
import {FactorItemService} from '../factor-item';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {OrderService} from './order.service';
import {ScriptService} from '../../shared/script/script.service';

@Component({
    selector: 'jhi-order-report',
    templateUrl: './order-report.component.html'
})
export class OrderReportComponent implements OnInit/*, OnDestroy */ {
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
        data:{
        }
    };

    report: any;
    mode: string;

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
        private factorItemService: FactorItemService
    ) {
        this.orderId = activatedRoute.snapshot.params['id'];
        this.mode = activatedRoute.snapshot.queryParams['mode'];

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode)).subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/order'],queryParams: {'mode': this.mode}});
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

        this.orderService.report(this.orderId)
            .subscribe(res => {
                console.log(res.body);
                this.json.data = res.body;

                this.json.data['exportDate'] = new DateJalaliPipe().transform(this.json.data['exportDate']);
                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/PrintOrder.V4.mrt');
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

    }
}
