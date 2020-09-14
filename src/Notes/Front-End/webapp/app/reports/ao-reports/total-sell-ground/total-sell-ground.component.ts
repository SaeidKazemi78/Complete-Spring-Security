import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {TotalSellGround, TotalSellGroundRequest} from './total-sell-ground.model';
import {TotalSellGroundService} from './total-sell-ground.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {RefuelCenterService} from '../../../entities/ao-entities/refuel-center/refuel-center.service';
import {RefuelCenter} from '../../../entities/ao-entities/refuel-center/refuel-center.model';
import {Person, PersonService} from '../../../entities/person';
import {Customer, CustomerService} from '../../../entities/customer';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';

@Component({
    selector: 'jhi-total-sell-ground',
    templateUrl: './total-sell-ground.component.html'
})
export class TotalSellGroundComponent implements OnInit, OnDestroy {

    currentAccount: any;
    totalSellGround: TotalSellGround[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: TotalSellGroundRequest = new TotalSellGroundRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.totalSellGround, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    date: any;
    fullName: String;
    countBenzin: number;
    countNaft: number;

    constructor(
        private totalSellGroundService: TotalSellGroundService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private principal: Principal,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
        private metreSheetService: MetreSheetService,
    ) {
    }

    loadAll() {
        this.totalSellGroundService.query(this.req).subscribe(
            (res: HttpResponse<TotalSellGround[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.metreSheetService.getDate().subscribe(res => {
            this.date = res.body;
        },res => this.onError(res.message));
        this.fullName = this.principal.getFullName();

        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.totalSellGround.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
            },res => this.onError(res.message));

        this.personService.query()
            .subscribe(res => {
                this.persons = res.body;
            },res => this.onError(res.message));
        this.customerService.query()
            .subscribe(res => {
                this.customers = res.body;
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

    private onSuccess(data) {
        this.totalSellGround = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.totalSellGround.length;
        this.state.skip = 0;
        this.gridData = process(this.totalSellGround, this.state);
        this.countNaft = 0;
        this.countBenzin = 0;
        this.totalSellGround.forEach(value => {
            if (value.productCode === '005401') {
                this.countBenzin += value.amount;
            } else {
                this.countNaft += value.amount;
            }
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
