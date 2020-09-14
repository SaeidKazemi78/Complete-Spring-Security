import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {RateDifference} from './rate-difference.model';
import {RateDifferenceService} from './rate-difference.service';
import {Principal} from '../../shared';

import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {BankTransaction} from '../bank-transaction/bank-transaction.model';
import {BankTransactionService} from '../bank-transaction';

@Component({
    selector: 'jhi-rate-difference-payment',
    templateUrl: './rate-difference-payment.component.html'
})
export class RateDifferencePaymentComponent implements OnInit, OnDestroy {

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
    rateDifferenceId: number;
    breadcrumbItems: any[];
    items: MenuItem[];
    payId: any;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    payStatus: any;
    bankTransaction: BankTransaction;

    constructor(
        private rateDifferenceService: RateDifferenceService,
        private bankTransactionService: BankTransactionService,
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
        bt.redirectUrl = `rateDifference/${this.rateDifferenceId}/payment/?IR`;
        bt.type = 'LEAN';
        bt.bankTransactionRefs = this.bankTransaction.bankTransactionRefs;

        this.bankTransactionService.startBankTransaction(bt).subscribe(value => {
            this.router.navigate([`rateDifference/${this.rateDifferenceId}/payment/` + value.body]);
        });
    }

    loadAll() {
        // this.loanService.find(this.loanId).subscribe(
        //     (res: HttpResponse<Loan>) => this.onSuccess(res.body, res.headers),
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.rateDifference.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/rate-difference']});
        });
        this.translateService.get('niopdcgatewayApp.rateDifference.home.titlePayment').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRateDifferences();

        this.activatedRoute.params.subscribe(value => {
            if (this.rateDifferenceId !== value['rateDifferenceId']) {
                this.rateDifferenceId = value['rateDifferenceId'];
                this.loadAll();
            }
            this.payId = value['payId'];
        });
        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RateDifference) {
        return item.id;
    }

    registerChangeInRateDifferences() {
        this.eventSubscriber = this.eventManager.subscribe('rateDifferenceListModification',response => this.loadAll());
    }

    private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = data.length;
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
