import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {TwentyFourAo, TwentyFourAoRequest} from './twenty-four-ao.model';
import {TwentyFourAoService} from './twenty-four-ao.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {RefuelCenterService} from '../../../entities/ao-entities/refuel-center/refuel-center.service';
import {RefuelCenter} from '../../../entities/ao-entities/refuel-center/refuel-center.model';
import {Person, PersonService} from '../../../entities/person';
import {Customer, CustomerService} from '../../../entities/customer';
import {MetreSheetService} from '../metre-sheet';
import {Principal} from '../../../shared';
import {DateJalaliPipe} from "app/shared/ng2-datetimepicker-jalali/date-jalali.pipe";
import {DxChartComponent, DxPivotGridComponent} from "devextreme-angular";
import {loadMessages, locale} from "devextreme/localization";

const fa = require('../../../../content/js/dx.messages.fa');

@Component({
    selector: 'jhi-twenty-four-ao',
    templateUrl: './twenty-four-ao.component.html'
})
export class TwentyFourAoComponent implements OnInit, OnDestroy {

    currentAccount: any;
    twentyFourAo: any[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: TwentyFourAoRequest = new TwentyFourAoRequest({});
    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;
    date: any;
    fullName: String;
    cols: string[] = [];

    @ViewChild(DxPivotGridComponent, {read: false}) pivotGrid: DxPivotGridComponent;
    @ViewChild(DxChartComponent, {read: false}) chart: DxChartComponent;
    pivotGridDataSource: any;

    constructor(
        private twentyFourAoService: TwentyFourAoService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private principal: Principal,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
        private metreSheetService: MetreSheetService,
    ) {
        loadMessages(fa);
        locale('fa');
    }

    loadAll() {
        this.twentyFourAoService.query(this.req).subscribe(
            (res: HttpResponse<TwentyFourAo[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
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
        this.translateService.get('niopdcgatewayApp.twentyFourAo.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                this.req.refuelCenterId = this.refuelCenters[0].id;
            }, res => this.onError(res.message));

        this.personService.query()
            .subscribe(res => {
                this.persons = res.body;
            }, res => this.onError(res.message));
        this.customerService.query()
            .subscribe(res => {
                this.customers = res.body;
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

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.twentyFourAo = data;
        this.twentyFourAo.forEach(value => {
            value.registerDate = new Date(value.registerDate);
            value['hour'] = value.registerDate.getHours();
            const persianDate = new DateJalaliPipe().transform(value.registerDate);
            value['year'] = persianDate.toString().split('/')[0];
            value['month'] = persianDate.toString().split('/')[1];
            value['day'] = persianDate.toString().split('/')[2];
            value['totalProduct'] = 'فرآورده ها';
        });
        console.log(this.twentyFourAo);
        this.pivotGridDataSource = {
            fields: [{
                caption: 'فرآورده',
                width: 120,
                dataField: 'totalProduct',
                area: 'row'
            }, {
                caption: 'فرآورده',
                dataField: 'product',
                width: 120,
                area: 'row'
            }, {
                dataField: 'hour',
                area: 'column'
            }, {
                dataField: 'day',
                area: 'column'
            }, {
                dataField: 'month',
                area: 'column'
            }, {
                dataField: 'year',
                area: 'column'
            }, {
                caption: 'مجموع',
                dataField: 'amount',
                dataType: 'number',
                summaryType: 'sum',
                area: 'data'
            }, {
                summaryType: 'count',
                area: 'data',
                caption: 'تعداد'
            }
            ],
            store: this.twentyFourAo
        };
        this.pivotGrid.instance.bindChart(this.chart.instance, {
            dataFieldsDisplayMode: "splitPanes",
            alternateDataFields: false
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    customizeTooltip(args) {

        return {
            html: args.seriesName + args.originalValue
        };
    }
}
