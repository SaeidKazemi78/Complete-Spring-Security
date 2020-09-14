import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {ExportPiPayment} from './export-pi-payment.model';
import {ExportPiPaymentService} from './export-pi-payment.service';
import {Principal} from '../../shared';
import {ExportPi, ExportPiService} from '../export-pi/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ExportLetter, ExportLetterService} from 'app/entities/export-letter';
import {Currency, CurrencyService} from 'app/entities/currency';

@Component({
    selector: 'jhi-export-pi-payment',
    templateUrl: './export-pi-payment.component.html'
})
export class ExportPiPaymentComponent implements OnInit, OnDestroy {

    currentAccount: any;
    exportPiPayments: ExportPiPayment[];
    sumPrice = 0;
    avgSanaRate = 0;
    value = 0;
    sumPriceCurrency = 0;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    exportPiId: number;
    exportPi: ExportPi;
    exportLetterId: number;
    exportLetter: ExportLetter;
    currency: Currency;
    breadcrumbItems: any[];

    customerId: number;
    personId: number;

    constructor(
        private exportPiPaymentService: ExportPiPaymentService,
        private exportPiService: ExportPiService,
        private exportLetterService: ExportLetterService,
        private currencyService: CurrencyService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.exportPiId = activatedRoute.snapshot.params['exportPiId'];
        this.exportLetterId = activatedRoute.snapshot.params['exportLetterId'];
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
    }

    startPay() {
        this.exportPiService.requestPay(this.exportPiId).subscribe(value1 => {
            this.router.navigate(['sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetterId + '/export-pi/' + this.exportPiId + '/export-pi-payment/' + value1.payId], {
                queryParams: {
                    person: this.personId ? this.personId : null,
                    customer: this.customerId ? this.customerId : null,
                }
            });
        });
    }

    loadAll() {
        this.exportPiPaymentService.query(this.exportPiId).subscribe(
            (res: HttpResponse<ExportPiPayment[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        this.router.navigate(['sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetterId + '/export-pi/' + this.exportPiId + '/export-pi-payment'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.exportPiPayment.home.exportPiTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.exportPi.piNumber})`,
                routerLink: ['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetter.id + '/export-pi'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        this.translateService.get('niopdcgatewayApp.exportPiPayment.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInExportPiPayments();

        this.exportPiService.find(this.exportPiId).subscribe(
            (exportPi: HttpResponse<ExportPi>) => {
                this.exportPi = exportPi.body;
                this.exportLetterService.find(this.exportPi.exportLetterId).subscribe(
                    (exportLetter: HttpResponse<ExportLetter>) => {
                        this.exportLetter = exportLetter.body;
                        this.setBreadCrumb();
                        this.loadAll();
                    }
                );
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExportPiPayment) {
        return item.id;
    }

    registerChangeInExportPiPayments() {
        this.eventSubscriber = this.eventManager.subscribe('exportPiPaymentListModification', response => this.loadAll());
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.exportPiPayments = data;
        if (this.exportPiPayments && this.exportPiPayments.length) {
            // j15
            this.sumPrice = this.exportPiPayments.map(value => value.price).reduce((previousValue, currentValue) => previousValue + currentValue);
            this.exportPiPayments.forEach(value => {
                value.sanaRate = (value.sanaRateBuy + value.sanaRateSell) / 2;
                // k12
                value.percent = value.price / this.sumPrice;
                // m12
                value.quota = value.percent * value.sanaRate;
            });
            this.avgSanaRate = this.exportPiPayments.map(value => value.quota).reduce((previousValue, currentValue) => previousValue + currentValue);
            this.sumPriceCurrency = Math.round(this.sumPrice / this.avgSanaRate * 100) / 100;
            this.avgSanaRate = Math.round(this.avgSanaRate);
            this.value = Math.round(this.sumPriceCurrency / this.exportLetter.baseRate * 100) / 100;
        } else {
            this.sumPrice = 0;
            this.avgSanaRate = 0;
            this.sumPriceCurrency = 0;
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    round(number: number) {
        return Math.round(number * 1000) / 1000;
    }

}
