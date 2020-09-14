import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {BankTransaction} from '../bank-transaction/bank-transaction.model';
import {ProductRateDifferenceService} from './product-rate-difference.service';

@Component({
    selector: 'jhi-product-rate-difference-payment',
    templateUrl: './product-rate-difference-payment.component.html'
})
export class ProductRateDifferencePaymentComponent implements OnInit {

    currentAccount: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];

    identifier: string;
    payStatus: string = null;

    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    bankTransaction: BankTransaction;

    constructor(
        private productRateDifferenceService: ProductRateDifferenceService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService
    ) {
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.productRateDifference.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/product-rate-difference']});
        });
        this.translateService.get('entity.action.pay').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.params.subscribe(value => {
            this.identifier = value['payId'];
        });
        this.setBreadCrumb();
    }

    onBankTransaction(bankTransaction: BankTransaction) {
        this.bankTransaction = bankTransaction;
    }

    onPayStatus(status) {
        this.payStatus = status;
    }

    pay() {
        this.ePaymentComponent.pay();
    }

    againPay() {
        this.productRateDifferenceService.createRequestIdentifier(this.bankTransaction.bankTransactionRefs[0].orderId).subscribe(value => {
            this.router.navigate([`product-rate-difference/payment/` + value.body]);
        });
    }

    cancel() {
        this.router.navigateByUrl('/product-rate-difference');
    }
}
