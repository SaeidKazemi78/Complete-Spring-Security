import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Factor} from './factor.model';
import {FactorService} from './factor.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../shared/stimulsoft/stimulsoft.service';
import {Personality, PersonService} from '../person';
import {FactorItemService} from '../factor-item';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {ScriptService} from '../../shared/script/script.service';

declare var Stimulsoft: any;

@Component({
    selector: 'jhi-factor',
    templateUrl: './factor-report-aggregate.component.html'
})
export class FactorReportAggregateComponent implements OnInit/*, OnDestroy */ {

    currentAccount: any;
    factors: Factor[];
    factor: Factor = new Factor();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    breadcrumbItems: any[];
    factorId: number;
    json = {
        factor: {},
        factorDetails: []
    };
    Personality = Personality;

    report: any = new Stimulsoft.Report.StiReport();

    constructor(
        private factorService: FactorService,
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
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.factorId = activatedRoute.snapshot.params['factorId'];
        this.factor.active = null;

    }

    loadAll() {
        this.factorService.query({}).subscribe(
            (res: HttpResponse<Factor[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.factor.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/factor']});
        });
        this.translateService.get('niopdcgatewayApp.factor.home.reportAggregate').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        const options = new Stimulsoft.Viewer.StiViewerOptions;
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = false;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        this.factorService.find(this.factorId)
            .subscribe(res => {
                const factor = res.body;
                this.personService.find(factor.personId).subscribe(personRes => {
                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/factor-aggregateReport.mrt');
                    const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                    this.json.factor['personName'] = personRes.body.fullName;
                    this.json.factor['economicalCode'] = personRes.body.personality === this.Personality[this.Personality.LEGAL] ? personRes.body.economicCode : personRes.body.code;
                    this.json.factor['address'] = personRes.body.address;
                    this.json.factor['postalCode'] = personRes.body.postalCode;
                    this.json.factor['telephone'] = personRes.body.telephone;
                    this.json.factor['printDate'] = new DateJalaliPipe().transform(new Date());
                    this.json.factor['serialNumber'] = factor.factorNo;
                    this.json.factor['registerDate'] = new DateJalaliPipe().transform(factor.registerDate);
                    this.json.factor['startDate'] = new DateJalaliPipe().transform(factor.startDate);
                    this.json.factor['finishDate'] = new DateJalaliPipe().transform(factor.finishDate);
                    this.factorItemService.queryForAggregate(this.factorId)
                        .subscribe(factorItems => {
                            this.json.factorDetails = factorItems.body;
                            const strJson = JSON.stringify(this.json);
                            dataSet.readJson(strJson);
                            report.dictionary.databases.clear();
                            report.regData('Demo', 'Demo', dataSet);
                            viewer.report = report;

                            console.log('Rendering the viewer to selected element');
                            viewer.renderHtml('viewer');
                            this.setBreadCrumb();
                        });
                });
            });

    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/

    trackId(index: number, item: Factor) {
        return item.id;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.factors = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
