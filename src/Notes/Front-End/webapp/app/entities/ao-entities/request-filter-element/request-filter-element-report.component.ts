import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../../shared/index';
import {TranslateService} from '@ngx-translate/core';

import {StimulsoftService} from '../../../shared/stimulsoft/stimulsoft.service';
import {ScriptService} from '../../../shared/script/script.service';
import {RequestFilterElementService} from './request-filter-element.service';
import {ElementType} from '../element/index';
import {ProductService} from '../../product/index';
import {ElementRequestReason, FilterLocation} from './request-filter-element.model';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    selector: 'jhi-order-report',
    templateUrl: './request-filter-element-report.component.html'
})
export class RequestFilterElementReportComponent implements OnInit/*, OnDestroy */ {
    currentAccount: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    breadcrumbItems: any[];
    id: number;
    json = {
        data: {
            date: '',
            no: '',
            attachment: '',
            target: '',
            source: '',
            filterNo: '',
            lastChangeDate: '',
            microFilterDate: '',
            coalescerDate: '',
            separatorDate: '',
            monitorDate: '',
            clayDate: '',
            psi: 0,
            product: '',
            isDrainTanker: '',
            isBetweenMainAndService: '',
            isLadingUnit: '',
            fuelUnit: '',
            isOilDepot: '',
            description: '',
            microFilter: '',
            microFilterNo: 0,
            coalesce: '',
            coalesceNo: 0,
            monitor: '',
            monitorNo: 0,
            seperator: '',
            separatorNo: 0,
            clay: '',
            clayNo: 0,
            maxDiff: '',
            maxTimeElapsed: '',
            unAcceptableDrop: '',
            unAcceptableResult: '',
            abnormalResult: '',
            tearingElement: '',
            suddenDrop: '',
            amountOfFuelLitter: 0
        }
    };

    report: any;
    mode: string;
    ElementType = ElementType;
    FilterLocation = FilterLocation;
    ElementRequestReason = ElementRequestReason;

    constructor(
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private requestFilterElementService: RequestFilterElementService,
        private activatedRoute: ActivatedRoute,
        private stimulsfotSerive: StimulsoftService,
        private router: Router,
        private script: ScriptService,
        private productService: ProductService,
        private translateService: TranslateService
    ) {
        this.id = activatedRoute.snapshot.params['id'];
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.order.home.boundarySell').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/boundary-sell']});
        });
        this.translateService.get('niopdcgatewayApp.order.home.report').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');

        this.requestFilterElementService.find(this.id)
            .subscribe(res => {
                this.productService.find(res.body.productId)
                    .subscribe(product => {
                        this.json.data.date = 'تاریخ نامه';
                        this.json.data.no = 'شماره نامه';
                        this.json.data.source = res.body.refuelCenterPersianTitle;
                        this.json.data.target = 'مهندسی سوخت های هوایی - واحد کنترل کیفیت';
                        this.json.data.filterNo = res.body.filterTitle;
                        this.json.data.fuelUnit = res.body.oilTankTitle;
                        if (res.body.lastChangeDateElements && res.body.lastChangeDateElements.length > 0) {
                            res.body.lastChangeDateElements.forEach(value => {
                                if (value.elementType === this.ElementType[this.ElementType.MICROFILTER]) {
                                    this.json.data.microFilterDate = new DateJalaliPipe().transform(value.lastChangeDate);
                                } else if (value.elementType === this.ElementType[this.ElementType.COALESCER]) {
                                    this.json.data.coalescerDate = new DateJalaliPipe().transform(value.lastChangeDate);
                                } else if (value.elementType === this.ElementType[this.ElementType.SEPARATOR]) {
                                    this.json.data.separatorDate = new DateJalaliPipe().transform(value.lastChangeDate);
                                } else if (value.elementType === this.ElementType[this.ElementType.MONITOR]) {
                                    this.json.data.monitorDate = new DateJalaliPipe().transform(value.lastChangeDate);
                                } else if (value.elementType === this.ElementType[this.ElementType.CLAY]) {
                                    this.json.data.clayDate = new DateJalaliPipe().transform(value.lastChangeDate);
                                }
                            });
                        }
                        this.json.data.product = product.body.title;
                        this.json.data.psi = res.body.maximumPressureDifference;
                        if (res.body.filterLocation === this.FilterLocation[this.FilterLocation.DRAIN_TANKER]) {
                            this.json.data.isDrainTanker = '✓';
                        } else if (res.body.filterLocation === this.FilterLocation[this.FilterLocation.BETWEEN_MAIN_AND_SERVICE]) {
                            this.json.data.isBetweenMainAndService = '✓';
                        } else if (res.body.filterLocation === this.FilterLocation[this.FilterLocation.LADING_UNIT]) {
                            this.json.data.isLadingUnit = '✓';
                        } else if (res.body.filterLocation === this.FilterLocation[this.FilterLocation.OIL_DEPOT]) {
                            this.json.data.isOilDepot = '✓';
                        }
                        if (res.body.requestElements && res.body.requestElements.length > 0) {
                            res.body.requestElements.forEach(value => {
                                if (value.elementType === this.ElementType[this.ElementType.MICROFILTER]) {
                                    this.json.data.microFilter = value.elementTitle;
                                    this.json.data.microFilterNo = value.count;
                                } else if (value.elementType === this.ElementType[this.ElementType.COALESCER]) {
                                    this.json.data.coalesce = value.elementTitle;
                                    this.json.data.coalesceNo = value.count;
                                } else if (value.elementType === this.ElementType[this.ElementType.SEPARATOR]) {
                                    this.json.data.seperator = value.elementTitle;
                                    this.json.data.separatorNo = value.count;
                                } else if (value.elementType === this.ElementType[this.ElementType.MONITOR]) {
                                    this.json.data.monitor = value.elementTitle;
                                    this.json.data.monitorNo = value.count;
                                } else if (value.elementType === this.ElementType[this.ElementType.CLAY]) {
                                    this.json.data.clay = value.elementTitle;
                                    this.json.data.clayNo = value.count;
                                }
                            });
                        }
                        if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.MAX_DIFF]) {
                            this.json.data.maxDiff = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.MAX_TIME_ELAPSED]) {
                            this.json.data.maxTimeElapsed = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.UNACCEPTABLE_DROP]) {
                            this.json.data.unAcceptableDrop = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.UNACCEPTABLE_RESULT]) {
                            this.json.data.unAcceptableResult = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.ABNORMAL_RESULT]) {
                            this.json.data.abnormalResult = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.TEARING_ELEMENT]) {
                            this.json.data.tearingElement = '✓';
                        } else if (res.body.elementRequestReason === this.ElementRequestReason[this.ElementRequestReason.SUDDEN_DROP]) {
                            this.json.data.suddenDrop = '✓';
                        }
                        this.json.data.amountOfFuelLitter = res.body.amountOfFuelPassed;

                        const report = new Stimulsoft.Report.StiReport();
                        report.loadFile('/content/mrt/Filter Request Element.mrt');
                        const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                        const strJson = JSON.stringify(this.json);
                        dataSet.readJson(strJson);
                        report.dictionary.databases.clear();
                        report.regData('Demo', 'Demo', dataSet);
                        viewer.report = report;

                        viewer.renderHtml('viewer');
                        this.setBreadCrumb();
                    });

                /*this.json.orders.forEach((value) => {
                    value.exportDate = new DateJalaliPipe().transform(value.exportDate);
                    value.startShift = new DateJalaliPipe().transform(value.startShift);
                    value.tankType = this.translateService.instant('niopdcgatewayApp.TankType.' + value.tankType);
                    if (value.endShift) {
                        value.endShift = new DateJalaliPipe().transform(value.endShift);
                    }
                });
                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mrt/BoundaryPrint.mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                const strJson = JSON.stringify(this.json);
                dataSet.readJson(strJson);
                report.dictionary.databases.clear();
                report.regData('Demo', 'Demo', dataSet);
                viewer.report = report;

                console.log('Rendering the viewer to selected element');
                viewer.renderHtml('viewer');
                this.setBreadCrumb();*/
            });

    }
}
