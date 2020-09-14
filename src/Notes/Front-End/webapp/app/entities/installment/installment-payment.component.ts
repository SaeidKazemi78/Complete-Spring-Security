import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {Installment} from './installment.model';
import {InstallmentService} from './installment.service';
import {Principal} from '../../shared';
import {Loan, LoanService} from '../loan/.';

import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MenuItem} from 'primeng/api';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {BankTransaction} from '../bank-transaction/bank-transaction.model';
import {BankTransactionService} from '../bank-transaction';

@Component({
    selector: 'jhi-installment-payment',
    templateUrl: './installment-payment.component.html'
})
export class InstallmentPaymentComponent implements OnInit, OnDestroy {

    currentAccount: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    loanId: number;
    loan: Loan;
    breadcrumbItems: any[];
    items: MenuItem[];
    payId: any;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    payStatus: any;
    bankTransaction: BankTransaction;

    constructor(
        private installmentService: InstallmentService,
        private bankTransactionService: BankTransactionService,
        private loanService: LoanService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {

    }

    onPayStatus(status) {
        this.payStatus = status;
    }

    onBankTransaction(bankTransaction: BankTransaction) {
        this.bankTransaction = bankTransaction;
    }

    pay() {
        this.ePaymentComponent.pay();
    }

    againPay() {
        const bt = new BankTransaction();
        bt.redirectUrl = `loan/${this.loan.id}/installment/payment/?IR`;
        bt.type = 'LEAN';
        bt.bankTransactionRefs = this.bankTransaction.bankTransactionRefs;

        this.bankTransactionService.startBankTransaction(bt).subscribe(value => {
            this.router.navigate([`loan/${this.loan.id}/installment/payment/` + value.body]);
        });
    }

    loadAll() {
        this.loanService.find(this.loanId).subscribe(
            (res: HttpResponse<Loan>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.installment.home.loanTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.loan.customerName.trim()})`, routerLink: ['/loan']
            });
        });
        this.translateService.get('niopdcgatewayApp.installment.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/loan', this.loanId, 'installment']});
        });
        this.translateService.get('niopdcgatewayApp.installment.home.titlePayment').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInstallments();

        this.activatedRoute.params.subscribe(value => {
            if (this.loanId !== value['loanId']) {
                this.loanId = value['loanId'];
                this.loadAll();
            }
            this.payId = value['payId'];
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Installment) {
        return item.id;
    }

    registerChangeInInstallments() {
        this.eventSubscriber = this.eventManager.subscribe('installmentListModification',response => this.loadAll());
    }

    private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = data.length;
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.loan = data;
        this.setBreadCrumb();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
