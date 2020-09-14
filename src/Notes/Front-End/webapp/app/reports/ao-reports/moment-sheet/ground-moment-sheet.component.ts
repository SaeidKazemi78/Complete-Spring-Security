import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {MomentSheetService} from './moment-sheet.service';
import {RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {ScriptService} from '../../../shared/script/script.service';
import {SellGroundFuelRequest} from './moment-sheet.model';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    selector: 'jhi-ground-moment-sheet',
    templateUrl: './ground-moment-sheet.component.html'
})
export class GroundMomentSheetComponent implements OnInit, OnDestroy {

    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: SellGroundFuelRequest = new SellGroundFuelRequest();
    refuelCenters: any[];

    constructor(
        private refuelCenterService: RefuelCenterService,
        private momentSheetService: MomentSheetService,
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
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        this.momentSheetService.queryGroundMomentSheet(this.req)
            .subscribe(value => {
                const json: any = {};

                json['info'] = {
                    date: new DateJalaliPipe().transform(this.req.day)
                };
                json['sellGrounds'] = value.body;

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/sellGroundMomentSheet.mrt');
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
