import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
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
import {EPaymentComponent} from 'app/shared/e-payment/e-payment.component';
import {BankTransactionService} from 'app/entities/bank-transaction';

@Component({
    selector: 'jhi-export-pi-e-payment',
    templateUrl: './export-pi-e-payment.component.html'
})
export class ExportPiEPaymentComponent implements OnInit {

    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    identifier: string;
    payStatus: string;
    payEnable = false;

    currentAccount: any;
    exportPiId: number;
    exportPi: ExportPi;
    exportLetterId: number;
    exportLetter: ExportLetter;
    breadcrumbItems: any[];

    customerId: number;
    personId: number;

    constructor(
        private exportPiPaymentService: ExportPiPaymentService,
        private bankTransactionService: BankTransactionService,
        private exportPiService: ExportPiService,
        private exportLetterService: ExportLetterService,
        private currencyService: CurrencyService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService
    ) {
        this.exportPiId = activatedRoute.snapshot.params['exportPiId'];
        this.exportLetterId = activatedRoute.snapshot.params['exportLetterId'];
        this.identifier = activatedRoute.snapshot.params['payId'];
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
    }

    onPayStatus(status) {
        this.payStatus = status;
        if (this.payStatus === 'COMPLETE') {
            setTimeout(() => {
                this.router.navigate(['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetter.id + '/export-pi/' + this.exportPiId + '/export-pi-payment']);

                // this.orderService.findBoundarySell(this.orderId).subscribe(value => {
                //     this.boundarySell.status = value.body.status;
                //     this.boundarySell.multiPrePay = value.body.multiPrePay;
                //
                //     this.isUserPaid = (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID] ||
                //         (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID_PUMP] && !this.transitAlongFuelAmountSetter && !this.transhipAlongFuelAmountSetter));
                //
                //     this.isView = (this.isUserPaid || this.boundarySell.status === this.OrderStatus[OrderStatus.PENDING]);
                //
                //     this.previousStep();
                // });
            }, 3000);
        }
    }

    restartBankTransaction() {
            this.bankTransactionService.restartBankTransaction(this.identifier).subscribe(res => {
                this.identifier = res.body;
                this.router.navigate(['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetter.id + '/export-pi/' + this.exportPiId + '/export-pi-payment/' + this.identifier]);
            });
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.exportPiPayment.home.title').subscribe(title => {
            this.breadcrumbItems.push({
                label: title,
                routerLink: ['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetter.id + '/export-pi/' + this.exportPiId + '/export-pi-payment/'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        this.translateService.get('entity.action.pay').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.exportPiService.find(this.exportPiId).subscribe(
            (exportPi: HttpResponse<ExportPi>) => {
                this.exportPi = exportPi.body;
                this.exportLetterService.find(this.exportPi.exportLetterId).subscribe(
                    (exportLetter: HttpResponse<ExportLetter>) => {
                        this.exportLetter = exportLetter.body;
                        this.setBreadCrumb();
                        // this.loadAll();
                    }
                );
            }
        );
    }

}
