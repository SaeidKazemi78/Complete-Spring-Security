import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {MomentSheetService} from './moment-sheet.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {MomentSheetAo, MomentSheetRequest} from './moment-sheet.model';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';
import {DateTimeJalaliPipe} from "app/shared/ng2-datetimepicker-jalali";
import {loadMessages, locale} from 'devextreme/localization';

const fa = require('../../../../content/js/dx.messages.fa');

@Component({
    selector: 'jhi-moment-sheet',
    templateUrl: './moment-sheet-ao.component.html'
})
export class MomentSheetAoComponent implements OnInit, OnDestroy {

    currentAccount: any;
    momentSheets: MomentSheetAo[] = [];
    refuelCenters: RefuelCenter[] = [];
    error: any;
    refuelCenterTitle: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    showReport: boolean;
    value:any;
    req: MomentSheetRequest = new MomentSheetRequest({});
    aggregates: any[] = [
        {field: 'startMeasurementOilTankAmount', aggregate: 'sum'},
        {field: 'endMeasurementOilTankAmount', aggregate: 'sum'},
        {field: 'receivedFromOilTanks', aggregate: 'sum'},
        {field: 'receivedFromLogBooks', aggregate: 'sum'},
        {field: 'receivedFromUnitOilTanks', aggregate: 'sum'},
        {field: 'sumOfReceive', aggregate: 'sum'},
        {field: 'sendToUnitOilTanks', aggregate: 'sum'},
        {field: 'sendToServiceOilTanks', aggregate: 'sum'},
        {field: 'sendToContaminatedOilTanks', aggregate: 'sum'},
        {field: 'sendToOilTanks', aggregate: 'sum'},
        {field: 'sendToLogBooks', aggregate: 'sum'},
        {field: 'sumOfSends', aggregate: 'sum'},
        {field: 'deductible', aggregate: 'sum'},
        {field: 'addition', aggregate: 'sum'}
    ];
    total: any = aggregateBy(this.momentSheets, this.aggregates);

    state: State = {take: 10};
    gridData: any = process(this.momentSheets, this.state);
    date: any;
    fullName: String;

    constructor(
        private refuelCenterService: RefuelCenterService,
        private momentSheetService: MomentSheetService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private metreSheetService: MetreSheetService,
        private principal: Principal,
        private eventManager: JhiEventManager
    ) {
        loadMessages(fa);
        locale('fa');
    }

    loadAll() {
        this.momentSheetService.queryAo(this.req).subscribe(
            (res: HttpResponse<MomentSheetAo[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.momentSheet.home.aoTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.req.startTime = new Date();
        this.req.startTime.setHours(0);
        this.req.startTime.setMinutes(0);
        this.req.startTime.setSeconds(0);
        this.req.endTime = new Date();
        this.req.endTime.setHours(23);
        this.req.endTime.setMinutes(59);
        this.req.endTime.setSeconds(59);
        this.metreSheetService.getDate().subscribe(res => {
            this.date = res.body;
        }, res => this.onError(res.message));
        this.fullName = this.principal.getFullName();

        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true).subscribe(res => {
            this.refuelCenters = res.body;
            this.req.refuelCenterId = this.refuelCenters[0].id;
        });

    }

    ngOnDestroy() {
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    private onSuccess(data) {
        this.momentSheets = data;
        this.momentSheets.forEach(value => {
            value.sumOfReceive = value.sumOfReceive + value.startMeasurementOilTankAmount;
            value.sumOfSends = value.sumOfSends - value.sendToLogBooks;
        });
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.momentSheets.forEach(value => {
            value.day = new DateTimeJalaliPipe().transform(value.day);
        });
        this.state.take = this.momentSheets.length;
        this.state.skip = 0;
        this.gridData = process(this.momentSheets, this.state);
        this.total = aggregateBy(this.momentSheets, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    showPrint() {
        this.showReport = !this.showReport;
    }

    onChangeRefuelCenter(data) {
        const ref: RefuelCenter = this.refuelCenters.find(value => value.id === data);
        this.refuelCenterTitle = ref.persianTitle;
    }

}
