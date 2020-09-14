import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {TotalPlatformService} from './total-platform.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {Principal} from '../../../shared';
import {TotalPlatform, TotalPlatformRequest} from './total-platform.model';
import {OilTank, OilTankService, OilTankType} from "../../../entities/ao-entities/oil-tank";

@Component({
    selector: 'jhi-total-sell',
    templateUrl: './total-platform.component.html'
})
export class TotalPlatformComponent implements OnInit, OnDestroy {

    currentAccount: any;
    totalPlatformAtk: TotalPlatform[] = [];
    totalPlatformJp4: TotalPlatform[] = [];
    error: any;
    date: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: TotalPlatformRequest = new TotalPlatformRequest({});
    aggregates: any[] = [
        {field: 'totalAmount', aggregate: 'sum'},
        {field: 'platformSell', aggregate: 'sum'},
        {field: 'unitToPlatform', aggregate: 'sum'}
    ];
    totalAtk: any = aggregateBy(this.totalPlatformAtk, this.aggregates);
    totalJp4: any = aggregateBy(this.totalPlatformJp4, this.aggregates);
    state: State = {take: 10};
    gridDataAtk: any = process(this.totalPlatformAtk, this.state);
    gridDataJp4: any = process(this.totalPlatformJp4, this.state);
    fullName: any;
    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    oilTanks: OilTank[];
    OilTankType = OilTankType;

    constructor(
        private totalPlatformService: TotalPlatformService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private principal: Principal,
        private oilTankService: OilTankService
    ) {
    }

    loadAll() {
        this.totalPlatformService.query(this.req).subscribe(
            (res: HttpResponse<TotalPlatform[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.totalPlatform.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.fullName = this.principal.getFullName();
        this.date = new Date();
        this.setBreadCrumb();
        this.refuelCenterService.queryByReadAccess()
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
    }

    onChangeRefuelCenterId(refuelCenterId) {
        this.oilTankService.queryByRefuelCenterAndOilTank(refuelCenterId, this.OilTankType[this.OilTankType.PLATFORM])
            .subscribe(value => {
                this.oilTanks = value.body;
            });
    }

    ngOnDestroy() {
    }

    private onSuccess(data: TotalPlatform[]) {
        const jp4Data = data.filter(value => value.product === 'JP4');
        const atkData = data.filter(value => value.product === 'JetA 1');

        this.totalPlatformAtk = atkData;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.totalPlatformAtk.length;
        this.state.skip = 0;
        this.gridDataAtk = process(this.totalPlatformAtk, this.state);
        this.totalAtk = aggregateBy(this.totalPlatformAtk, this.aggregates);


        this.totalPlatformJp4 = jp4Data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.totalPlatformJp4.length;
        this.state.skip = 0;
        this.gridDataJp4 = process(this.totalPlatformJp4, this.state);
        this.totalJp4 = aggregateBy(this.totalPlatformJp4, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
