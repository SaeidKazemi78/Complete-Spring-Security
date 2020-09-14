import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DepotInventory, DepotInventoryRequest} from './depot-inventory.model';
import {DepotInventoryService} from './depot-inventory.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {PersonService} from '../../../entities/person';
import {CustomerService} from '../../../entities/customer';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {OilTank, OilTankService} from "app/entities/ao-entities/oil-tank";
import {DateTimeJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali';
import {ScriptService} from 'app/shared/script/script.service';
import {DateJalaliPipe} from "app/shared/ng2-datetimepicker-jalali/date-jalali.pipe";

@Component({
    selector: 'jhi-depot-inventory',
    templateUrl: './depot-inventory.component.html'
})
export class DepotInventoryComponent implements OnInit, OnDestroy {

    currentAccount: any;
    metre: DepotInventory[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DepotInventoryRequest = new DepotInventoryRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.metre, this.state);
    years: any[];
    refuelCenters: RefuelCenter[];
    oilTanks: OilTank[];
    refuelCenterId: number;
    personId: number;
    customerId: number;
    date: any;
    fullName: String;
    json = {
        firstDepotInventories: [],
        secondInventories: [],
        thirdInventories: []
    };

    constructor(
        private depotInventoryService: DepotInventoryService,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
        private metreSheetService: MetreSheetService,
        private oilTankService: OilTankService
    ) {
    }

    loadAll() {
        this.report();
        // this.depotInventoryService.query(this.req)
        //     .subscribe(value => this.onSuccess(value.body));
    }

    setBreadCrumb() {
        this.metreSheetService.getDate().subscribe(res => {
            this.date = res.body;
        }, res => this.onError(res.message));
        this.fullName = this.principal.getFullName();

        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.depotInventory.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.req.reportType = 'by-product';
        this.years = [];
        const date = new Date();
        const persianDate = new DateJalaliPipe().transform(date);
        const year: number = persianDate.toString().split('/')[0];
        this.years.push(year - 4);
        this.years.push(year - 3);
        this.years.push(year - 2);
        this.years.push(year - 1);
        this.years.push(year);

        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
            }, res => this.onError(res.message));

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
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.metre = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.metre.length;
        this.state.skip = 0;
        this.gridData = process(this.metre, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    public onChangeRefuelCenterId(refuelCenterId) {
        this.req.refuelCenterId = refuelCenterId;
        this.oilTankService.queryByRefuelCenter(refuelCenterId)
            .subscribe(res => {
                this.oilTanks = res.body;
            }, res => this.onError(res.message));
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

        this.depotInventoryService.query(this.req)
            .subscribe(res => {
                console.log(res.body);
                this.json.firstDepotInventories = res.body.firstDepotInventories;
                this.json.secondInventories = res.body.secondInventories;
                this.json.thirdInventories = res.body.thirdInventories;
                this.json.firstDepotInventories.forEach(value => {
                    value.registerDate = new DateTimeJalaliPipe().transform(value.registerDate);
                });
                this.json.secondInventories.forEach(value => {
                    value.registerDate = new DateTimeJalaliPipe().transform(value.registerDate);
                });
                this.json.thirdInventories.forEach(value => {
                    value.registerDate = new DateTimeJalaliPipe().transform(value.registerDate);
                });


                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/DepotInventory_V1.mrt');
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
}
