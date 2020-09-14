import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {MonthlyReportService} from './monthly-report.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {DateJalaliPipe} from "app/shared/ng2-datetimepicker-jalali/date-jalali.pipe";
import {MonthlyReport, MonthlyReportRequest} from "app/reports/sell-reports/monthly-report/monthly-report.model";
import {CustomerGroup, CustomerTypeService} from "app/entities/customer-type";
import {loadMessages, locale} from 'devextreme/localization';

const fa = require('../../../../content/js/dx.messages.fa');

@Component({
    selector: 'jhi-monthly-report-buy',
    templateUrl: './monthly-report.component.html'
})
export class MonthlyReportComponent implements OnInit, OnDestroy {
    breadcrumbItems: any[];
    years: number[] = [];
    req: MonthlyReportRequest = new MonthlyReportRequest();
    monthlyResponse: MonthlyReport [] = [];
    dataSource: any;
    customerGroups: any[] = [];
    customerTypes: any[] = [];
    regions: any[] = [];
    customers: any[] = [];

    constructor(
        private monthlyReportService: MonthlyReportService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
    ) {
        loadMessages(fa);
        locale('fa');
    }

    loadAll() {
        this.monthlyReportService.query(this.req).subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.monthlyReport.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        const date = new Date();
        const persianDate = new DateJalaliPipe().transform(date);
        const year: number = persianDate.toString().split('/')[0];
        this.years.push(year - 4);
        this.years.push(year - 3);
        this.years.push(year - 2);
        this.years.push(year - 1);
        this.years.push(year);

        for (const customerGroupKey in CustomerGroup) {
            if (isNaN(parseInt(customerGroupKey, 10))) {
                this.translateService.get('niopdcgatewayApp.CustomerGroup.' + customerGroupKey)
                    .subscribe(value => {
                        this.customerGroups.push({
                            value: customerGroupKey,
                            label: value
                        });
                    });
            }
        }
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.monthlyResponse = data;
        this.monthlyResponse.forEach(value => {
            const persianDate = new DateJalaliPipe().transform(value.date);
            value.persianYear = persianDate.toString().split('/')[0];
            const month = persianDate.toString().split('/')[1];
            if (month === '01') {
                value.persianMonth = 'فروردین';
            } else if (month === '02') {
                value.persianMonth = 'اردیبهشت';
            } else if (month === '03') {
                value.persianMonth = 'خرداد';
            } else if (month === '04') {
                value.persianMonth = 'تیر';
            } else if (month === '05') {
                value.persianMonth = 'مرداد';
            } else if (month === '06') {
                value.persianMonth = 'شهریور';
            } else if (month === '07') {
                value.persianMonth = 'مهر';
            } else if (month === '08') {
                value.persianMonth = 'آبان';
            } else if (month === '09') {
                value.persianMonth = 'آذر';
            } else if (month === '10') {
                value.persianMonth = 'دی';
            } else if (month === '11') {
                value.persianMonth = 'بهمن';
            } else if (month === '12') {
                value.persianMonth = 'اسفند';
            }
        });
        console.log(this.monthlyResponse);
        this.dataSource = {
            fields: [
                {
                    caption: 'فرآورده',
                    width: 120,
                    dataField: 'productTitle',
                    area: 'row'
                }, {
                    caption: 'نرخ فرآورده',
                    width: 120,
                    dataField: 'productRatePrice',
                    area: 'row'
                },
                {
                    dataField: 'persianYear',
                    area: 'column'
                },
                {
                    dataField: 'persianMonth',
                    area: 'column'
                },
                {
                    caption: 'مقدار',
                    width: 120,
                    summaryType: 'sum',
                    dataType: 'number',
                    dataField: 'amount',
                    area: 'data'
                }
            ],
            store: this.monthlyResponse
        }
    }

    monthSelector(data) {
        return data.persianMonth + ' (' + data.persianYear + ')';
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.loadAll();
    }

    changeCustomerGroup(customerGroups) {
        console.log(customerGroups.toString());
        this.customerTypeService.queryByCustomerGroupList(customerGroups)
            .subscribe(value => {
                value.body.forEach(ct => {
                    this.customerTypes.push({
                        value: ct.id,
                        label: ct.title
                    });
                });
            });
    }

    changeCustomerType(customerTypeIds) {
        this.req.customerTypeIds = null;
        this.req.customerTypeIds = customerTypeIds;
    }

}
