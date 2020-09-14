import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {Airplane, AirplaneRequest} from './airplane.model';
import {AirplaneService} from './airplane.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {Person, PersonService} from '../../../entities/person';
import {Customer, CustomerService} from '../../../entities/customer';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';

@Component({
    selector: 'jhi-airplane',
    templateUrl: './airplane.component.html'
})
export class AirplaneComponent implements OnInit, OnDestroy {

    currentAccount: any;
    airplane: Airplane[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AirplaneRequest = new AirplaneRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.airplane, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    date: any;
    fullName: String;

    constructor(
        private airplaneService: AirplaneService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
        private metreSheetService: MetreSheetService,
        private principal: Principal,
    ) {
    }

    loadAll() {
        this.airplaneService.query(this.req).subscribe(
            (res: HttpResponse<Airplane[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.airplane.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.metreSheetService.getDate().subscribe(res => {
            this.date = res.body;
        },res => this.onError(res.message));
        this.fullName = this.principal.getFullName();
        this.setBreadCrumb();
        this.req.state.take = 10;
        this.req.state.group = [];
        this.req.state.sort = [];
        this.req.state.skip = 0;
        this.loadAll();

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.airplane = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.airplane, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
