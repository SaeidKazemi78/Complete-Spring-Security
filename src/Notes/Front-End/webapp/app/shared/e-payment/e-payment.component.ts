import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {PaymentService} from '../../entities/payment/payment.service';
import {Principal} from '../index';
import {TranslateService} from '@ngx-translate/core';
import {BankTransactionRef, BankTransactionService, BankTransactionState, PaymentMethod} from '../../entities/bank-transaction/index';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Payment} from '../../entities/payment/payment.model';
import {PlatformLocation} from '@angular/common';
import {CookieService} from 'ngx-cookie';
import {MelliPosService} from './melli-pos.service';
import {MelliPosDevice, MelliPosSale, MelliPosSaleResponse} from './melli-pos.model';
import {DateJalaliPipe} from '../ng2-datetimepicker-jalali/date-jalali.pipe';
import {MellatPosSale, MellatPosSaleResponse} from './mellat-pos.model';
import {MellatPosService} from './mellat-pos.service';
import {PspConfig} from '../../entities/psp-config';
import {Psp} from '../../entities/psp-config/psp-config.model';
import {NiopdcBankAccount, NiopdcBankAccountService} from '../../entities/niopdc-bank-account';
import {UserPosDevice, UserPosDeviceService} from '../../entities/user-pos-device';
import {PosDeviceServiceType} from '../../entities/pos-device';
import {WalletService} from 'app/entities/wallet';

@Component({
    selector: 'jhi-e-payment',
    templateUrl: './e-payment.component.html',
    styleUrls: ['./e-payment.component.css']
})
export class EPaymentComponent implements OnInit, OnChanges {

    @Input('requestIdentifier')
    requestIdentifier;
    @Input('showButton')
    showButton = true;
    @Input("personId")
    personId: number;
    @Input("customerId")
    customerId: number;
    @Output('status')
    status = new EventEmitter();
    @Output('bankTransaction')
    bankTransaction = new EventEmitter();
    @Output('onOnlyPayment')
    onOnlyPayment = new EventEmitter();
    @Output('canPay')
    canPay = new EventEmitter();


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
    amount: number;
    BankTransactionState = BankTransactionState;
    state: any;
    existPayment: boolean;
    payments: Payment[] = [];
    @ViewChild('formipg') form: ElementRef;
    onlyPayment: boolean;
    payAmount: number;
    baseUrl: any;
    message: any;
    redirectUrl: any;

    ipgParams = [];

    payType: string;
    testPay: boolean;
    cashDeskPay: boolean;

    Psp = Psp;
    ipgs: PspConfig[];
    ipg: PspConfig;
    disableAmountIpg: boolean;

    PosDeviceServiceType = PosDeviceServiceType;
    userPosDevices: UserPosDevice[];
    userPosDevice: UserPosDevice;
    melliPosDevices: MelliPosDevice[] | null;
    melliPosDevice: MelliPosDevice | null;

    paymentInquiry: any = {bank: 'MELLAT', receiptDateTime: new Date(), boundaryCustomer: false, type: null, complete: false};
    paymentInquiring;
    newDate = new Date();
    niopdcbankaccounts: NiopdcBankAccount[];
    customNiopdcBankAccounts: any[];
    user: any;
    inquiring: boolean;
    acceptInquiry: boolean;
    infoInquiry: any;
    bankTransactionRefs: BankTransactionRef[];
    paymentMethod: any;
    PaymentMethod = PaymentMethod;


    constructor(private paymentService: PaymentService,
                private bankTransactionService: BankTransactionService,
                private niopdcBankAccountService: NiopdcBankAccountService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private router: Router,
                private translateService: TranslateService,
                private melliPosService: MelliPosService,
                private melatPosService: MellatPosService,
                private eventManager: JhiEventManager,
                private cookieService: CookieService,
                private userPosDeviceService: UserPosDeviceService,
                private platformLocation: PlatformLocation,
                private walletService: WalletService) {
        this.baseUrl = (platformLocation as any).location.origin;
        cookieService.put('baseUrl', this.baseUrl);
        const lastInquiryType = localStorage.getItem('lastInquiryType');
        this.paymentInquiry.type = lastInquiryType;
    }

    onExistPayment() {
        this.existPayment = true;
    }

    paymentSelected(paymentSelected: Payment[]) {
        let sum = 0;
        paymentSelected.forEach(value => {
            sum += value.currentAmount;
        });

        if (sum >= this.amount) {
            this.onlyPayment = true;
        } else {
            this.onlyPayment = false;
            this.payAmount = this.amount - sum;
        }
        this.onOnlyPayment.emit(this.onlyPayment);
        this.checkCanPay();
    }

    public changeType(event) {
        console.log(event);
        this.payType = event.nextId;
        localStorage.setItem('lastPayType', this.payType);
        this.checkCanPay();
    }

    checkCanPay() {
        this.canPay.emit(this.onlyPayment || this.testPay || this.cashDeskPay ||
            this.payType === 'EPAYMENT' || this.payType === 'POS' ||
            this.acceptInquiry
        );
    }

    reInquiry() {
        this.inquiring = false;
        this.acceptInquiry = false;
        this.checkCanPay();
    }

    public walletPay(){
        if(this.paymentMethod != undefined && this.paymentMethod === 'CASH'){
            this.jhiAlertService.error("error.can.not.pay.wallet",null,null);
            return;
        }
        this.canPay.emit(false);
        this.paymentService.payByWallet(this.requestIdentifier,this.personId,this.customerId)
            .subscribe((isOk: HttpResponse<any>) => {
                this.loadBankTransaction();
            }, (res: HttpErrorResponse) => {
                this.checkCanPay();
            });
    }


    public walletPay2(){
        if(this.paymentMethod != undefined && this.paymentMethod === 'CASH'){
            this.jhiAlertService.error("error.can.not.pay.wallet",null,null);
            return;
        }
        this.canPay.emit(false);
        this.paymentService.payByWallet2(this.requestIdentifier)
            .subscribe((isOk: HttpResponse<any>) => {
                this.loadBankTransaction();
            }, (res: HttpErrorResponse) => {
                this.checkCanPay();
            });
    }

    public pay() {
        if(this.paymentMethod != undefined && this.paymentMethod === 'WALLET'){
            this.jhiAlertService.error("error.can.not.pay.cash",null,null);
            return;
        }

        this.canPay.emit(false);

        if (this.testPay) {
            const now = new Date();
            const value = {
                'Amount': this.payAmount.toString(),
                'ApprovalCode': '000000',
                'CardNo': '000000******0000',
                'Merchant': '000000000000000',
                'OptionalField': null,
                'PacketType': '',
                'PcPosStatus': 'عملیات موفق',
                'ProccessingCode': '000000',
                'ResponseCode': '00',
                'Rrn': Math.floor(100000000000 + Math.random() * 999999999999).toString(),
                'Terminal': 'TEST',
                'TransactionDate': new DateJalaliPipe().transform(now),
                'TransactionNo': '000000',
                'TransactionTime': now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            };
            this.paymentService.payByPreviousPaymentsAndPcPos(this.requestIdentifier, this.payments, 'TEST', value)
                .subscribe((isOk: HttpResponse<any>) => {
                    this.loadBankTransaction();
                }, (res: HttpErrorResponse) => {
                    this.checkCanPay();
                });
        } else if (this.onlyPayment) {
            if (this.payments && this.payments.length > 0) {
                this.paymentService.payByPreviousPayments(this.requestIdentifier, this.payments)
                    .subscribe(() => {
                        this.loadBankTransaction();
                    }, () => {
                        this.loadBankTransaction();
                    });
            }
        } else {
            if ((!this.userPosDevices || !this.userPosDevices.length) && this.payType === 'POS') {
                this.payType = 'INQUIRY';
            }

            if (this.payType === 'EPAYMENT') {
                if (this.ipg.psp === this.Psp[Psp.BEHPARDAKHT]) {
                    this.paymentService.updatePreviousPaymentsAndGetRefId(this.requestIdentifier, this.payAmount, this.payments)
                        .subscribe((refId: HttpResponse<any>) => {
                            if (refId.body) {
                                this.ipgParams = Object.keys(refId.body).map(key => {
                                    return {name: key, value: refId.body[key]};
                                });
                                this.disableAmountIpg = true;
                                this.loadBankTransaction();
                                setTimeout(() => {
                                    this.form.nativeElement.submit();
                                }, 1000);
                            }
                        }, (res: HttpErrorResponse) => {
                            this.checkCanPay();
                        });
                }
                /* todo enable for markazi
                this.paymentService.updatePreviousPayments(this.requestIdentifier, this.payments)
                    .subscribe((isOk: HttpResponse<Boolean>) => {
                        if (isOk) {
                            this.form.nativeElement.submit();
                        }
                    }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));*/
            } else if (this.payType === 'POS') {
                if (this.userPosDevice.type === 'MELLI') {
                    const sale = new MelliPosSale(this.melliPosDevice.IpAdress, this.melliPosDevice.Port, 'Lan', '1:0,2:100', '3', this.payAmount + '');
                    this.melliPosService.sale(this.userPosDevice.internalIp, sale).subscribe((value: MelliPosSaleResponse) => {
                        if (value.ResponseCode === '0' || value.ResponseCode === '00') {
                            this.paymentService.payByPreviousPaymentsAndPcPos(this.requestIdentifier, this.payments, 'MELLI', value)
                                .subscribe((isOk: HttpResponse<any>) => {
                                    if (isOk.body) {
                                        this.loadBankTransaction();
                                    }
                                }, (res: HttpErrorResponse) =>  console.debug(res));
                        } else {
                            this.checkCanPay();
                            this.jhiAlertService.error(value.PcPosStatus, null, null);
                        }
                    });
                } else if (this.userPosDevice.type === 'BEHPARDAKHT') {
                    const sale = new MellatPosSale(this.userPosDevice.pcId);

                    if (this.bankTransactionRefs.length === 1) {
                        const posDeviceAccount = this.userPosDevice.posDeviceAccounts.find(value => {
                            return value.niopdcBankAccountTypeIds.includes(this.bankTransactionRefs[0].niopdcBankAccountTypeId);
                        });

                        if (this.userPosDevice.serviceTypes.includes(this.PosDeviceServiceType[PosDeviceServiceType.SINGLE_PAY])) {
                            sale.ServiceCode = '2';
                            sale.Amount = this.payAmount + '';
                            sale.PayerId = posDeviceAccount.payerId;
                            sale.AccountID = posDeviceAccount.accountIdentifier;
                        } else if (this.userPosDevice.serviceTypes.includes(this.PosDeviceServiceType[PosDeviceServiceType.MULTI_PAY])) {
                            sale.ServiceCode = '4';
                            sale.PrintDetail = '1';
                            sale.TotalAmount = this.payAmount + '';
                            sale.RequestList = [{
                                Amount: sale.TotalAmount,
                                PayerID: posDeviceAccount.payerId,
                                AccountID: posDeviceAccount.accountIdentifier
                            }];
                        }
                    } else {
                        sale.ServiceCode = '4';
                        sale.PrintDetail = '1';
                        sale.TotalAmount = this.payAmount + '';

                        let sumAmount = 0;

                        sale.RequestList =
                            this.bankTransactionRefs.map(bankTransactionRef => {
                                    const posDeviceAccount1 = this.userPosDevice.posDeviceAccounts.find(posDeviceAccount =>
                                        posDeviceAccount.niopdcBankAccountTypeIds.includes(bankTransactionRef.niopdcBankAccountTypeId)
                                    );

                                    const amount = (sumAmount + bankTransactionRef.amount > this.payAmount) ?
                                        this.payAmount - sumAmount :
                                        bankTransactionRef.amount;
                                    sumAmount = sumAmount + amount;

                                    return {
                                        Amount: String(amount),
                                        PayerID: posDeviceAccount1.payerId,
                                        AccountID: posDeviceAccount1.accountIdentifier
                                    };
                                }
                            ).filter(value => +value.Amount > 0);

                    }

                    if (this.userPosDevice.internalIp.includes('192.')) { // todo test for ip
                        this.melatPosService.sale2(this.userPosDevice.internalIp, sale).subscribe((value: HttpResponse<MellatPosSaleResponse>) => {
                            if (value.body.ReturnCode === 100) {
                                setTimeout(() => {
                                    this.paymentService.payByPreviousPaymentsAndPcPos(this.requestIdentifier, this.payments, 'MELLAT', value.body)
                                        .subscribe((isOk: HttpResponse<any>) => {
                                            this.loadBankTransaction();
                                        });
                                }, 2000);
                            } else {
                                this.checkCanPay();
                                this.jhiAlertService.error('error.behpardakht.pos.' + value.body.ReturnCode, null, null);
                            }
                        }, () => {
                            this.checkCanPay();
                            this.jhiAlertService.error('error.behpardakht.pos.404', null, null);
                        });
                    } else {
                        this.melatPosService.sale(this.userPosDevice.internalIp, sale).subscribe((value: HttpResponse<MellatPosSaleResponse>) => {
                            if (value.body.ReturnCode === 100) {
                                setTimeout(() => {
                                    this.paymentService.payByPreviousPaymentsAndPcPos(this.requestIdentifier, this.payments, 'MELLAT', value.body)
                                        .subscribe(() => {
                                            this.loadBankTransaction();
                                        }, () => this.checkCanPay());
                                }, 5000);
                            } else {
                                this.checkCanPay();
                                this.jhiAlertService.error('error.behpardakht.pos.' + value.body.ReturnCode, null, null);
                            }
                        }, () => {
                            this.checkCanPay();
                            this.jhiAlertService.error('error.behpardakht.pos.404', null, null);
                        });
                    }
                }
            } else if (this.payType === 'INQUIRY') {
                if (this.inquiring && this.acceptInquiry) {
                    this.paymentService.payByPreviousPaymentsAndInquiry(this.requestIdentifier, this.payments, this.paymentInquiring)
                        .subscribe((isOk: HttpResponse<any>) => {
                            this.loadBankTransaction();
                        }, () => this.loadBankTransaction());
                } else if (!this.paymentInquiry.type || ((this.paymentInquiry.type === 'POS' || this.paymentInquiry.type === 'EPAYMENT') &&
                    (!this.paymentInquiry.receiptDateTime || !this.paymentInquiry.referenceId)) ||
                    (this.paymentInquiry.type === 'BRANCH' &&
                        (!this.paymentInquiry.receiptDateTime || !this.paymentInquiry.referenceId ||
                            !this.paymentInquiry.branch || !this.paymentInquiry.niopdcBankAccount))) {
                    this.jhiAlertService.error('error.complete.data');
                    return;
                }
                this.paymentInquiring = Object.assign({}, this.paymentInquiry);
                this.paymentInquiry.requestIdentifier = this.requestIdentifier;
                this.paymentService.getInfoInquiry(this.paymentInquiry)
                    .subscribe((isOk: HttpResponse<any>) => {
                        this.acceptInquiry = false;
                        this.inquiring = true;
                        this.infoInquiry = isOk.body;
                        this.checkCanPay();
                    }, () => this.checkCanPay());
            } else {
                alert('ورودی نامعتبر');
                window.location.reload();
            }
        }
    }

    /*
            if (this.inquiring) {
                if (this.acceptInquiry) {

                }
            } else
                    if (!this.onlyPayment) {

                        if ((!this.posDevices || !this.posDevices.length) && this.payType === 'POS') {
                            this.payType = 'INQUIRY';
                        }

                }
            }
        }*/

    onChangePosDevice() {
        if (this.userPosDevice.type === 'MELLI') {
            const ip = this.userPosDevice.internalIp;
            if (ip) {
                this.melliPosService.getInfo(ip).subscribe(value => {
                    this.melliPosService.getDevices(ip).subscribe(value1 => {
                        this.melliPosDevices = value1.body;
                        if (this.melliPosDevices && this.melliPosDevices.length) {
                            this.melliPosDevice = this.melliPosDevices[0];
                        }
                    });
                }, () => {
                    this.melliPosDevice = null;
                });
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.requestIdentifier && !changes.requestIdentifier.isFirstChange()) {
            this.disableAmountIpg = false;
            this.ngOnInit();
            this.checkCanPay();
        }
    }

    ngOnInit() {
        this.principal.identity().then(value => {
            this.user = value;
        });
        this.loadBankTransaction();

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


    }


    loadBankTransaction() {
        if (this.requestIdentifier) {
            this.bankTransactionService.findByIdentifier(this.requestIdentifier).subscribe(bankTransaction => {
                this.amount = bankTransaction.body.amount;
                this.state = bankTransaction.body.bankTransactionState;
                this.payAmount = this.amount;
                this.redirectUrl = bankTransaction.body.redirectUrl;
                this.bankTransactionRefs = bankTransaction.body.bankTransactionRefs;
                this.paymentMethod = bankTransaction.body.paymentMethod;

                this.ipgs = bankTransaction.body.ipgs;
                this.userPosDevices = bankTransaction.body.userPosDevices;
                if (this.userPosDevices && this.userPosDevices.length) {
                    this.userPosDevice = this.userPosDevices.find(value1 => value1.defaultPos);
                    if (this.userPosDevice == undefined) {
                        this.userPosDevice = this.userPosDevices[0];
                    }
                }
                if (this.ipgs && this.ipgs.length) {
                    this.ipgs.forEach(value => {
                        if (value.psp === this.Psp[Psp.BEHPARDAKHT]) {
                            value.pspIcon = value.psp + '.svg';
                        } else if (value.psp === this.Psp[Psp.SADAD]) {
                            value.pspIcon = value.psp + '.png';
                        }

                    });

                    this.ipg = this.ipgs[0];
                }

                this.payType = 'EPAYMENT';
                if (!this.ipgs || !this.ipgs.length) {
                    this.payType = 'POS';
                }
                if (this.payType === 'POS' && (!this.userPosDevices || !this.userPosDevices.length)) {
                    this.payType = 'INQUIRY';
                }
                if (this.payType === 'INQUIRY' && !this.principal.hasAnyAuthority(['ROLE_ADMIN', 'INQUIRY_PAYMENT'])) {
                    this.payType = null;
                }

                this.createMessage();
                this.status.emit(this.state);
                this.bankTransaction.emit(bankTransaction.body);
                this.checkCanPay();
            }, (res: Response) => {
                this.checkCanPay();
                this.onError(res);
            });
        }
    }

    createMessage() {
        this.message = null;
        if (!this.state) {
            this.message = {
                icon: 'error',
                reload: true,
                title: 'بارگذاری اطلاعات اولیه',
                body: 'خطا در بارگذاری اطلاعات اولیه. اطلاعات را دوباره بارگذاری کنید.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.FAILED]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت ناموفق',
                body: 'تراکنش ناموفق بوده است. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد. '
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.CANCEL]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت لغو شده',
                body: 'پرداخت از طرف کاربر لغو شده اشت.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.SYS_ERROR] ||
            this.state === this.BankTransactionState[this.BankTransactionState.BANK_ERROR]) {
            this.message = {
                icon: 'error',
                title: 'خطا',
                body: 'عملیات پرداخت با خطا متوقف شد. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.COMPLETE]) {
            this.message = {
                icon: 'good',
                title: 'تراکنش موفق',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' با موفقیت انجام شد.',
                redirectUrl: this.redirectUrl
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.COMPLETE_PAY]) {
            this.message = {
                icon: 'good',
                title: 'تراکنش موفق',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' با موفقیت انجام شد. و به لیست فیش های موجود شما اضافه گردید.',
                redirectUrl: this.redirectUrl
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.PENDING]) {
            this.message = {
                icon: 'warning',
                title: 'فیش موجود',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' به فیش های موجود شما افزوده شد. مراحل پرداخت از طریق فیش های موجود شما امکان پذیر می باشد.'
            };
        }
    }

    private onError(error) {
        console.debug(error);
        this.createMessage();
    }
}
