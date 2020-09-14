import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Payment, PaymentInquiry} from './payment.model';
import {PaymentService} from './payment.service';
import {Principal} from '../../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyService} from '../currency';
import {Observable} from 'rxjs/Observable';
import {NiopdcBankAccount, NiopdcBankAccountService} from '../niopdc-bank-account';
import {CustomPlaque} from '../plaque';
import {Location, LocationService} from '../location';

@Component({
    selector: 'jhi-payment-inquiry',
    templateUrl: './payment-inquiry.component.html',
    styles: ['.messages {\n' +
    '    padding: 20px;\n' +
    '    border-bottom: 1px solid #eaeaea;\n' +
    '}\n' +
    '\n' +
    '.messages .ttl {\n' +
    '    color: #0e80e6;\n' +
    '    font-weight: 500;\n' +
    '    text-align:left;\n' +
    '}\n' +
    '\n' +
    '\n' +
    '.messages img {\n' +
    '    float: center;\n' +
    '}\n']
})
export class PaymentInquiryComponent implements OnInit, OnDestroy {

    currentAccount: any;
    paymentInquiry: PaymentInquiry = new PaymentInquiry();
    payments: Payment[];
    payment: Payment = new Payment();
    isSaving;
    currencies;
    error: any;
    success: any;
    inquiryId: number;
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
    breadcrumbItems: any[];
    boundaryCustomer = false;
    niopdcbankaccounts: NiopdcBankAccount[];
    customNiopdcBankAccounts: any[];
    customPlaque: CustomPlaque = new CustomPlaque();
    inquiring: boolean;
    acceptInquiry: boolean;
    infoInquiry: any;
    locations: Location[];
    customLocation: any[];

    constructor(
        private paymentService: PaymentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private currencyService: CurrencyService,
        private principal: Principal,
        private niopdcBankAccountService: NiopdcBankAccountService,
        private locationService: LocationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {

    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.payment.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/payment']});
        });
        this.translateService.get('niopdcgatewayApp.paymentInquiryRequestDTO.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.paymentInquiry.bank = 'MELLAT';
        this.paymentInquiry.receiptDateTime = new Date();
        this.paymentInquiry.boundaryCustomer = false;

        this.inquiryId = this.activatedRoute.snapshot.params['id'];

        this.niopdcBankAccountService.findAll()
            .subscribe((res: HttpResponse<NiopdcBankAccount[]>) => {
                this.niopdcbankaccounts = res.body;

                this.customNiopdcBankAccounts = [{}];
                this.niopdcbankaccounts.forEach(value => {
                    this.customNiopdcBankAccounts.push({
                        value: value.id,
                        label: value.title + '( ' + value.accountNumber + ' )'
                    });
                });

            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.setBreadCrumb();
        this.loadLocation();
        if (this.inquiryId) {
            this.paymentService.findInquiry(this.inquiryId).subscribe(item => {
                this.paymentInquiry = item.body;
                this.customPlaque = this.paymentInquiry.customPlaque ? this.paymentInquiry.customPlaque : this.paymentInquiry.customPlaqueTwo;
            });
        }
    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;

                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }

            });
    }

    ngOnDestroy() {
    }

    clear() {

    }

    inquiry() {
        if (!this.paymentInquiry.type || ((this.paymentInquiry.type === 'POS' || this.paymentInquiry.type === 'EPAYMENT') &&
            (!this.paymentInquiry.receiptDateTime || !this.paymentInquiry.referenceId)) ||
            (this.paymentInquiry.type === 'BRANCH' &&
                (!this.paymentInquiry.receiptDateTime || !this.paymentInquiry.referenceId || !this.paymentInquiry.branch || !this.paymentInquiry.niopdcBankAccount))) {
            this.jhiAlertService.error('error.complete.data');
            return;
        }
        this.isSaving = true;
        this.error = null;
        if (this.customPlaque) {
            this.paymentInquiry.plaque = this.customPlaque.plaque;
        }
        if (this.inquiring) {
            if (this.acceptInquiry) {
                this.subscribeToSaveResponse(this.paymentService.inquiry(this.paymentInquiry));
            }
        } else {
            this.paymentService.getInfoInquiry(this.paymentInquiry)
                .subscribe((isOk: HttpResponse<any>) => {
                    // if (isOk.body) {
                    this.acceptInquiry = false;
                    this.inquiring = true;
                    this.infoInquiry = isOk.body;
                    // }
                }, error1 => this.onErrorMessage(error1.error));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Boolean>>) {
        result.subscribe((res: HttpResponse<Boolean>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onError(res.error));
    }

    private onSaveSuccess(result: Boolean) {

        this.eventManager.broadcast({name: 'paymentListModification', content: 'OK'});
        this.success = true;

        this.isSaving = false;
    }

    private onError(error: any) {
        console.log(error);
        this.isSaving = false;
        this.jhiAlertService.error(error.message, null, null);

        if (error.message !== 'error.validation') {
            this.error = error;
        }
    }
    private onErrorMessage(error: any) {
        console.log(error);
        this.jhiAlertService.error(error.message, null, null);
    }

}
