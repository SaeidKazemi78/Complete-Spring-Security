import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {Platform, PlatformRequest} from './platform.model';
import {PlatformService} from './platform.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {OilTankService} from '../../../entities/ao-entities/oil-tank/oil-tank.service';
import {RefuelCenterService} from '../../../entities/ao-entities/refuel-center/refuel-center.service';
import {OilTank} from '../../../entities/ao-entities/oil-tank/oil-tank.model';
import {RefuelCenter} from '../../../entities/ao-entities/refuel-center/refuel-center.model';
import {Person, PersonService} from '../../../entities/person';
import {Customer, CustomerService} from '../../../entities/customer';
import {Principal} from '../../../shared';

@Component({
    selector: 'jhi-platform',
    templateUrl: './platform.component.html'
})
export class PlatformComponent implements OnInit, OnDestroy {

    currentAccount: any;
    platform: Platform[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: PlatformRequest = new PlatformRequest({});
    aggregates: any[] = [
        {field: 'amount', aggregate: 'sum'},
        {field: 'platformName', aggregate: 'count'}
    ];
    state: State = {take: 10};
    gridData: any = process(this.platform, this.state);
    total: any = aggregateBy(this.platform, this.aggregates);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    date: any;
    fullName: String;
    oiltanks: OilTank[];

    constructor(
        private platformService: PlatformService,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
        private oilTankService: OilTankService,
    ) {
    }

    loadAll() {
        this.platformService.query(this.req).subscribe(
            (res: HttpResponse<Platform[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.fullName = this.principal.getFullName();

        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.platformReport.home.title').subscribe(title => {
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

    onChangeRefuelCenter(data) {
        this.req.oilTankId = null;
        if (data) {
            this.oilTankService.queryByRefuelCenterByUnit(data)
                .subscribe(res => {
                    this.oiltanks = res.body;
                },res => this.onError(res.message));
        }
    }

    private onSuccess(data) {
        this.platform = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.platform.length;
        this.state.skip = 0;
        this.gridData = process(this.platform, this.state);
        this.total = aggregateBy(this.platform, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
