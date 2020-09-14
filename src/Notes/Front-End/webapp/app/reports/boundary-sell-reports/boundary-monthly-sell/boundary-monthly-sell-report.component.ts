import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {BoundaryMonthlySellReportService} from './boundary-monthly-sell-report.service';
import {
    BoundaryMonthlySellReportRequest,
    BoundaryMonthlySellReportResponse,
    ReportType
} from './boundary-monthly-sell-report.model';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';
import {Location, LocationService} from '../../../entities/location';
import {Principal, User} from '../../../shared';
import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {Product, ProductService} from '../../../entities/product';
import {loadMessages, locale} from 'devextreme/localization';

const fa = require('../../../../content/js/dx.messages.fa');

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-monthly-sell-report.component.html'
})
export class BoundaryMonthlySellReportComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    req: BoundaryMonthlySellReportRequest = new BoundaryMonthlySellReportRequest();
    locations: Location[];
    customLocation: any[];
    customerType: any[];
    breadcrumbItems: any[];
    CustomerGroup = CustomerGroup;
    customProducts: any[];
    selectedProduct: any;
    products: any[];
    customerTypes: CustomerType[] = [];

    boundaryMonthlySellReportResponses: BoundaryMonthlySellReportResponse[] = [];
    showReport: boolean;
    ReportType = ReportType;
    mode: string;
    user: User;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private boundaryMonthlySellReportService: BoundaryMonthlySellReportService,
        private locationService: LocationService,
        private productService: ProductService,
        private customerTypeService: CustomerTypeService
    ) {
        loadMessages(fa);
        locale('fa');
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.boundaryDetailsSell.home.monthlySell').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {

        this.principal.identity().then(value => {
            this.user = value;
        });
        this.setBreadCrumb();
        this.loadLocation();
        this.loadCustomerTypes();
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.req.reportType = this.ReportType[ReportType.ORDER_DATE];
        this.loadProduct();

    }

    loadProduct() {
        this.productService.query().subscribe(products => {
            this.products = products.body;
            this.customProducts = [];
            this.customProducts.push({
                value: null,
                label: ''
            });
            this.products.forEach((value: Product) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customProducts.push(newVar);
            });
        });
    }

    loadCustomerTypes() {
        this.customerTypeService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
            .subscribe(value => {
                this.customerTypes = value.body;
                this.customerType = [];
                this.customerType.push({
                    value: null,
                    label: ''
                });
                for (let i = 0; i < this.customerTypes.length; i++) {
                    this.customerType.push({
                        value: this.customerTypes[i].id,
                        label: this.customerTypes[i].title
                    });
                }
            });
    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                this.customLocation = [];
                this.customLocation.push({
                    value: null,
                    label: ''
                });
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }

    loadAll() {
        this.boundaryMonthlySellReportService.query(this.req)
            .subscribe(value => {
                this.boundaryMonthlySellReportResponses = value.body;
                this.translateMonth();
                this.showReport = true;

            });
    }

    translateMonth() {
        this.boundaryMonthlySellReportResponses.forEach(value => {
            const month: string = value.registerDate.split('-')[1];
            if (month === '01') {
                value.registerDate = 'فروردین';
            } else if (month === '02') {
                value.registerDate = 'اردیبهشت';
            } else if (month === '03') {
                value.registerDate = 'خرداد';
            } else if (month === '04') {
                value.registerDate = 'تیر';
            } else if (month === '05') {
                value.registerDate = 'مرداد';
            } else if (month === '06') {
                value.registerDate = 'شهریور';
            } else if (month === '07') {
                value.registerDate = 'مهر';
            } else if (month === '08') {
                value.registerDate = 'آبان';
            } else if (month === '09') {
                value.registerDate = 'آذر';
            } else if (month === '10') {
                value.registerDate = 'دی';
            } else if (month === '11') {
                value.registerDate = 'بهمن';
            } else if (month === '12') {
                value.registerDate = 'اسفند';
            }
        });
    }
}
