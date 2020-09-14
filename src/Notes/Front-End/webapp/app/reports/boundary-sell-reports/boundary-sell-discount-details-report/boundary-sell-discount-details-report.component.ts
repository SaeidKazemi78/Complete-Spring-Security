import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';

import {CustomerGroup, CustomerTypeService} from '../../../entities/customer-type';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Principal, User} from '../../../shared';
import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {DateTimeJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali';
import {Location, LocationService} from '../../../entities/location';
import {BoundarySellDiscountRequestDTO} from './boundary-sell-discount-details-report.model';
import {BoundaryDiscountDetailsSellReportService} from './boundary-sell-discount-details-report.service';

@Component({
    selector: 'jhi-boundary-discount-sell-report',
    templateUrl: './boundary-sell-discount-details-report.component.html'
})
export class BoundaryDiscountDetailsSellReportComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    req: BoundarySellDiscountRequestDTO = new BoundarySellDiscountRequestDTO({});
    customerTypes: any[];
    breadcrumbItems: any[];
    locations: Location[];
    customLocation: any[];

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
            customerTitle: null,
            typeName: null
        }
    };

    mode: string;
    user: User;
    CustomerGroup = CustomerGroup;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private boundaryDiscountDetailsSellReportService: BoundaryDiscountDetailsSellReportService,
        private locationService: LocationService

    ) {
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });

        this.translateService.get('niopdcgatewayApp.boundaryDiscount.discountDetailsReport').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {

        this.principal.identity().then(value => {
            this.user = value;
        });
        this.setBreadCrumb();

        this.customerTypeService.queryByCustomerGroup(this.CustomerGroup[CustomerGroup.BOUNDARY])
            .subscribe(result => {
                this.customerTypes = [];
                result.body.forEach(value => {
                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.customerTypes.push(newVar);
                });
            });

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

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.endDate = new Date();
        this.req.endDate.setHours(23);
        this.req.endDate.setMinutes(59);
        this.req.endDate.setSeconds(59);

        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);

    }

    report() {
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

        this.boundaryDiscountDetailsSellReportService.query(this.req)
            .subscribe(res => {
                console.log(res.body);
                this.json.info.date = new DateTimeJalaliPipe().transform(res.body.info.date);
                this.json.data = res.body.dataList;

                this.json.info.fromDate = new DateJalaliPipe().transform(this.req.startDate);
                this.json.info.toDate = new DateJalaliPipe().transform(this.req.endDate);
                this.json.info.username = this.user.login;

              if (this.customerTypes && this.customerTypes.length > 0) {
                  this.customerTypes.forEach(option => {
                      if (option.value == this.req.customerTypeId) {
                          this.json.info.typeName = option.label;
                      }
                  });
              }

                if (this.locations && this.req.locationIds) {
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

                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/boundaryDiscountDetails-v2.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
                const strJson = JSON.stringify(this.json);
                console.log(strJson);
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
