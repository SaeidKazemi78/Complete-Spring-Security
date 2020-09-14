import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {AircraftRefuelingRecord, AircraftRefuelingRecordRequest} from './aircraft-refueling-record.model';
import {AircraftRefuelingRecordService} from './aircraft-refueling-record.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Person} from '../../../entities/person';
import {Customer} from '../../../entities/customer';
import {ContractType} from '../../../entities/sell-contract';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';

@Component({
    selector: 'jhi-aircraft-refueling-record',
    templateUrl: './aircraft-refueling-record.component.html'
})
export class AircraftRefuelingRecordComponent implements OnInit, OnDestroy {

    currentAccount: any;
    aircraftRefuelingRecord: AircraftRefuelingRecord[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AircraftRefuelingRecordRequest = new AircraftRefuelingRecordRequest({});
    aggregates: any[] = [
        {field: 'amount', aggregate: 'sum'},
        {field: 'receiptNo', aggregate: 'count'}
    ];
    total: any = aggregateBy(this.aircraftRefuelingRecord, this.aggregates);

    state: State = {take: 10};
    gridData: any = process(this.aircraftRefuelingRecord, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    // date: any;
    contractType = ContractType[ContractType.AIRPLANE];
    loadCustomer = true;

    constructor(
        private aircraftRefuelingRecordService: AircraftRefuelingRecordService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService
    ) {
    }

    loadAll() {
        this.aircraftRefuelingRecordService.query(this.req).subscribe(
            (res: HttpResponse<AircraftRefuelingRecord[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.aircraftRefuelingRecord.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        /*this.metreSheetService.getDate()
            .subscribe((res) => {
                this.date = res.body;
            }, (res) => this.onError(res.message));*/

        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
            },res => this.onError(res.message));

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    ngOnDestroy() {
    }

    personChange(data) {
        console.log(data);
        console.log(this.req.personId);
        this.loadCustomer = !this.loadCustomer;
        this.loadCustomer = !this.loadCustomer;
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    private onSuccess(data) {
        this.aircraftRefuelingRecord = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.aircraftRefuelingRecord.length;
        this.state.skip = 0;
        this.gridData = process(this.aircraftRefuelingRecord, this.state);
        this.total = aggregateBy(this.aircraftRefuelingRecord, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
