import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {BoundaryDetailsSellReportService} from './boundary-sell-details-report.service';
import {BoundaryDetailsSellReportRequest, ReportType} from './boundary-sell-details-report.model';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../../../entities/customer-type';
import {Location, LocationService} from '../../../entities/location';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Principal, User} from '../../../shared';
import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {Product, ProductService} from '../../../entities/product';
import {DateTimeJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali';

@Component({
    selector: 'jhi-boundary-sell-report',
    templateUrl: './boundary-sell-details-report.component.html'
})
export class BoundaryDetailsSellReportComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    req: BoundaryDetailsSellReportRequest = new BoundaryDetailsSellReportRequest({});
    locations: Location[];
    customLocation: any[];
    customerType: any[];
    breadcrumbItems: any[];
    CustomerGroup = CustomerGroup;
    customProducts: any[];
    selectedProduct: any;
    products: any[];
    customerTypes: CustomerType[] = [];
    searchRfId: string;
    searchPlaque: any;
    json = {
        data: [],
        info: {
            date: null,
            area: null,
            zone: null,
            boundary: null,
            fromDate: null,
            toDate: null,
            username: null,
            customerTitle: null
        }
    };
    ReportType = ReportType;
    mode: string;
    user: User;
    orderTypeOptions = []

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private boundaryDetailsSellReportService: BoundaryDetailsSellReportService,
        private locationService: LocationService,
        private productService: ProductService,
        private customerTypeService: CustomerTypeService
    ) {
        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSIT_DATA','ROLE_REPORT_ALL_DATA']).then(((value: boolean) => {
            if (value) {
                this.orderTypeOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSIT'),
                    value: 'BOUNDARY_TRANSIT'
                });
            }
        }));

        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_REPORT_TRANSHIP_DATA','ROLE_REPORT_ALL_DATA']).then(((value: boolean) => {
            if (value) {
                this.orderTypeOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderType.BOUNDARY_TRANSHIP'),
                    value: 'BOUNDARY_TRANSHIP'
                });
            }
        }));
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.boundaryDetailsSell.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.req.locationIds = [];

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
        this.req.reportType = this.ReportType[ReportType.PAYMENT_DATE];
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);

        this.loadProduct();

    }

    loadProduct() {
        this.productService.query().subscribe(products => {
            this.products = products.body;
            this.customProducts = [];
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

                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }

    report() {
        if (this.searchPlaque) {
            this.req.searchPlaque = this.searchPlaque.plaque;
        } else {
            this.req.searchPlaque = null;
        }
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/B Mitra Bold_0.ttf', 'B Mitra Bold');

        this.boundaryDetailsSellReportService.query(this.req)
            .subscribe(res => {
                console.log(res.body);
                this.json.info.date = new DateTimeJalaliPipe().transform(res.body.info.date);
                this.json.data = res.body.dataList;
                this.json.data.forEach(value => {
                    value.registerDate = new DateTimeJalaliPipe().transform(value.registerDate);
                    value.startShiftDate = new DateTimeJalaliPipe().transform(value.startShiftDate);
                    value.endShiftDate = new DateTimeJalaliPipe().transform(value.endShiftDate);
                });

                if (this.locations) {

                    const tempLocations = this.locations.where(value => this.req.locationIds.any(c => c == value.id));
                    if (tempLocations.length > 0) {
                        let locationNames = '';
                        for (let i = 0; i < tempLocations.length; i++) {
                            locationNames += tempLocations[i].name + ',';
                        }

                        if (locationNames.endsWith(',')) {
                            locationNames = locationNames.substring(0, locationNames.length - 1);
                        }

                        this.json.info.area = locationNames;
                    }
                }

                this.json.info.fromDate = new DateJalaliPipe().transform(this.req.startDate);
                this.json.info.toDate = new DateJalaliPipe().transform(this.req.finishDate);
                this.json.info.username = this.user.login;
                this.json.info.customerTitle = this.translateService.instant('global.string.all');

                if (this.req.customerTypeIds) {
                    let customerTitle = '';

                    this.customerTypes.forEach(obj => {
                        if (this.req.customerTypeIds.includes(obj.id)) {
                            customerTitle += obj.title + ',';
                        }

                    });
                    if (customerTitle.endsWith(',')) {
                        customerTitle = customerTitle.substring(0, customerTitle.length - 1);
                    }
                    this.json.info.customerTitle = customerTitle;
                }

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/boundaryDetailsSell.v3.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
                const strJson = JSON.stringify(this.json);
                dataSet.readJson(strJson);
                report.dictionary.databases.clear();
                report.regData('DataSet', 'DataSet', dataSet);
                viewer.report = report;

                console.log('Rendering the viewer to selected element');
                viewer.renderHtml('viewer');
                this.setBreadCrumb();
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
