import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {AoRequestModel, MetreSheet} from './metre-sheet.model';
import {MetreSheetService} from './metre-sheet.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {OilTank, OilTankService} from '../../../entities/ao-entities/oil-tank';
import {RefuelCenter, RefuelCenterService} from '../../../entities/ao-entities/refuel-center';
import {Principal} from '../../../shared';
import {Product, ProductService} from 'app/entities/product';
import {CustomerGroup} from 'app/entities/customer-type';

@Component({
    selector: 'jhi-metre-sheet',
    templateUrl: './metre-sheet-depot.component.html'
})
export class MetreSheetDepotComponent implements OnInit, OnDestroy {

    currentAccount: any;
    metreSheet: MetreSheet[] = [];
    metreSheetWithOutTransfer: MetreSheet[] = [];

    showReport: boolean;

    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AoRequestModel = new AoRequestModel({});
    aggregates: any[] = [
        {field: 'amount', aggregate: 'sum'},
        {field: 'differenceEndMetre', aggregate: 'sum'},
        {field: 'orderNumber', aggregate: 'count'},
        {field: 'startMetre', aggregate: 'min'},
        {field: 'endMetre', aggregate: 'max'}
    ];
    state: State = {take: 10};
    gridData: any = process(this.metreSheet, this.state);
    total: any = aggregateBy(this.metreSheet, this.aggregates);
    totalWhitOutTransfer: any = aggregateBy(this.metreSheetWithOutTransfer, this.aggregates);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    oiltanks: OilTank[];
    type = 1;
    date: any;
    fullName: any;
    mode: string;
    refuelCenterTitle: string;
    products: Product[];
    CustomerGroup = CustomerGroup;

    constructor(
        private metreSheetService: MetreSheetService,
        private route: ActivatedRoute,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private principal: Principal,
        private refuelCenterService: RefuelCenterService,
        private oilTankService: OilTankService,
        private productService: ProductService
    ) {
    }

    loadAll() {
        this.metreSheetService.queryDepot(this.req).subscribe(
            (res: HttpResponse<MetreSheet[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.metreSheet.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {

        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
                this.onChangeRefuelCenter(this.req.refuelCenterId);
            }, res => this.onError(res.message));

        this.productService.query(this.CustomerGroup[this.CustomerGroup.AIRPLANE])
            .subscribe(value => this.products = value.body);

        this.setBreadCrumb();

        this.metreSheetService.getDate().subscribe(res => {
            this.date = res.body;
        }, res => this.onError(res.message));
        this.fullName = this.principal.getFullName();

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    onChangeRefuelCenter(data) {
        this.req.oilTankId = null;
        this.oiltanks = [];
        const ref: RefuelCenter = this.refuelCenters.find(value => value.id === data);
        this.refuelCenterTitle = ref.persianTitle;
        this.oilTankService.queryByRefuelCenterByPlatformt(data)
            .subscribe(res => {
                this.oiltanks = res.body;
            }, res => this.onError(res.message));

    }

    ngOnDestroy() {
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    showPrint() {
        this.showReport = !this.showReport;
    }

    private onSuccess(data) {
        this.metreSheet = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state.take = this.metreSheet.length;
        this.state.skip = 0;
        this.gridData = process(this.metreSheet, this.state);
        this.total = aggregateBy(this.metreSheet, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
