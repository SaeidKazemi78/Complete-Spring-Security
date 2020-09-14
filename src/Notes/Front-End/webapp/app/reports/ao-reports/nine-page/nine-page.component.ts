import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {NinePageService} from './nine-page.service';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {ScriptService} from '../../../shared/script/script.service';
import {DateTimeJalaliPipe} from "app/shared/ng2-datetimepicker-jalali";
import {MomentSheetRequest, NinePageRequest} from "app/reports/ao-reports/moment-sheet";

@Component({
    selector: 'jhi-depot-moment-sheet',
    templateUrl: './nine-page.component.html'
})
export class NinePageComponent implements OnInit, OnDestroy {

    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: NinePageRequest = new NinePageRequest();
    refuelCenters: any[];
    refuelCenter: RefuelCenter;

    constructor(
        private refuelCenterService: RefuelCenterService,
        private ninePageService: NinePageService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
    ) {

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.momentSheet.home.depotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async search() {
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
        this.refuelCenter = this.refuelCenters.find(value => value.id === this.req.refuelCenterId);
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        this.ninePageService.query(this.req)
            .subscribe(value => {
                let json: any = {};
                json = value.body;
                json['info'] = {
                    startDate: new DateTimeJalaliPipe().transform(this.req.startDate),
                    finishDate: new DateTimeJalaliPipe().transform(this.req.finishDate),
                    refuelCenter: this.refuelCenter.persianTitle
                };

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/NinePage-V.1.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                const strJson = JSON.stringify(json);
                dataSet.readJson(strJson);
                report.dictionary.databases.clear();
                report.regData('Demo', 'Demo', dataSet);
                viewer.report = report;

                console.log('Rendering the viewer to selected element');
                viewer.renderHtml('viewer');
                this.setBreadCrumb();
            });
    }

    async ngOnInit() {
        this.refuelCenterService.queryByReadAccess().subscribe(value => this.refuelCenters = value.body);

    }

    ngOnDestroy() {
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
