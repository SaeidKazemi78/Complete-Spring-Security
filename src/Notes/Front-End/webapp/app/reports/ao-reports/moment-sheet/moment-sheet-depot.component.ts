import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {MomentSheetService} from './moment-sheet.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {MomentSheetDepot, MomentSheetRequest} from './moment-sheet.model';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';

@Component({
    selector: 'jhi-moment-sheet',
    templateUrl: './moment-sheet-depot.component.html'
})
export class MomentSheetDepotComponent implements OnInit, OnDestroy {

    currentAccount: any;
    momentSheets: MomentSheetDepot[] = [];
    refuelCenters: RefuelCenter[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: MomentSheetRequest = new MomentSheetRequest({});
    aggregates: any[] =
        [
            {field: 'addition', aggregate: 'sum'},
            {field: 'deductible', aggregate: 'sum'},
            {field: 'receiveDepots', aggregate: 'sum'},
            {field: 'receiveTransferContaminants', aggregate: 'sum'},
            {field: 'receiveTransferRecycles', aggregate: 'sum'},
            {field: 'receiveTransferMains', aggregate: 'sum'},
            {field: 'receiveTransferUnits', aggregate: 'sum'},
            {field: 'receiveTransferServiceTanks', aggregate: 'sum'},
            {field: 'receiveTransferTotals', aggregate: 'sum'},
            {field: 'sendDepots', aggregate: 'sum'},
            {field: 'sendToUnits', aggregate: 'sum'},
            {field: 'sendToContaminants', aggregate: 'sum'},
            {field: 'sendToRecycles', aggregate: 'sum'},
            {field: 'sendToServiceTanks', aggregate: 'sum'},
            {field: 'sendSells', aggregate: 'sum'},
            {field: 'sendToPlatforms', aggregate: 'sum'},
            {field: 'sendTotals', aggregate: 'sum'}
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
        private principal: Principal,
        private metreSheetService: MetreSheetService,
        private eventManager: JhiEventManager
    ) {

    }

    loadAll() {
        this.momentSheetService.queryDepot(this.req).subscribe(
            (res: HttpResponse<MomentSheetDepot[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
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
        },res => this.onError(res.message));
        this.fullName = this.principal.getFullName();

        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true).subscribe(res => {
            this.refuelCenters = res.body;
            this.req.refuelCenterId = this.refuelCenters[0].id;
        });

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.momentSheets = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.momentSheets.length;
        this.state.skip = 0;
        this.gridData = process(this.momentSheets, this.state);
        this.total = aggregateBy(this.momentSheets, this.aggregates);

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
