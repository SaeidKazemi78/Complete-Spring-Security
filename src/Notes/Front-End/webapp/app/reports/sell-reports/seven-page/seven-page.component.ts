import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {SevenPage, SevenPageRequest} from './seven-page.model';
import {SevenPageService} from './seven-page.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {ScriptService} from '../../../shared/script/script.service';

@Component({
    selector: 'jhi-consumption',
    templateUrl: './seven-page.component.html'
})
export class SevenPageComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sevenPage: SevenPage[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    breadcrumbItems: any[];
    req: SevenPageRequest = new SevenPageRequest();

    depots: any;

    json = {    };

    report: any;
    mode: string;
    viewer: Stimulsoft.Viewer.StiViewer;

    constructor(
        private sevenPageService: SevenPageService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private script: ScriptService,
        private productService: ProductService,
        private depotService: DepotService,
        private eventManager: JhiEventManager
    ) {

    }

    loadAll() {
        this.sevenPageService.query(this.req)
            .subscribe(res => {
                console.log(res.body);
                this.json = res.body;
                // this.json.Order.forEach((value) => {
                //     value.exportDate = new DateJalaliPipe().transform(value.exportDate);
                // });
                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/seven-page.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                const strJson = JSON.stringify(this.json);
                dataSet.readJson(strJson);
                report.dictionary.databases.clear();
                report.regData('Demo', 'Demo', dataSet);
                this.viewer.report = report;

                console.log('Rendering the viewer to selected element');
                this.viewer.renderHtml('viewer');
            });
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.sevenPage.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.setBreadCrumb();

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setMonth(this.req.startDate.getMonth() - 1);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = false;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        this.viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

    }

    locationChanged() {
        this.depotService.queryByLocation(this.req.locationId)
            .subscribe((res1: HttpResponse<Depot[]>) => {
                this.depots = res1.body.map(value => ({label: value.title, value: value.id}));
                if (this.depots && this.depots[0]) {
                    this.req.depotId = this.depots[0].value;
                    console.log(this.req.depotId);
                } else {
                    this.req.depotId = null;
                }
                this.depotChanged(this.req.depotId);
            }, (res1: HttpErrorResponse) => this.onError(res1.message));
    }

    depotChanged(depotId) {
        /*if (depotId) {
            this.search();
            /!* this.connectDepotService.query(depotId)
                 .subscribe((res1: HttpResponse<ConnectDepot[]>) => {
                     this.depotFiles = res1.body;
                 }, (res1: HttpErrorResponse) => this.onError(res1.message));*!/
        } else {
            this.depotFiles = null;
        }*/
    }

    // ngOnInit() {
    //     this.req.startDate = new Date();
    //     this.req.startDate.setHours(0);
    //     this.req.startDate.setMinutes(0);
    //     this.req.startDate.setSeconds(0);
    //     this.req.startDate.setSeconds(0);
    //     this.req.finishDate = new Date();
    //     this.req.finishDate.setHours(23);
    //     this.req.finishDate.setMinutes(59);
    //     this.req.finishDate.setSeconds(59);
    //     this.setBreadCrumb();
    //     this.productService.query()
    //         .subscribe((res: HttpResponse<Product[]>) => {
    //             this.products = res.body.map((p: Product) => {
    //                 return {label: p.title, value: p.id};
    //             });
    //         }, (res: HttpErrorResponse) => this.onError(res.error));
    //
    //     this.depotService.query()
    //         .subscribe((res: HttpResponse<Depot[]>) => {
    //             this.depots = res.body.map((p) => {
    //                 return {label: p.title, value: p.id};
    //             });
    //         }, (res: HttpErrorResponse) => this.onError(res.error));
    // }

    ngOnDestroy() {
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
