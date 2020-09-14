import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerCreditPopupService} from './customer-credit-popup.service';
import {CustomerCreditService} from './customer-credit.service';
import {CustomerService} from '../customer';
import {SellContractProduct, SellContractProductService} from '../sell-contract-product';
import {Currency} from '../currency/currency.model';
import {CurrencyService} from '../currency/currency.service';
import {CurrencyRateGroup} from '../currency-rate-group/currency-rate-group.model';
import {CurrencyRateGroupService} from '../currency-rate-group/currency-rate-group.service';
import {CustomerCredit, CustomerCreditAllowedDay} from './customer-credit.model';
import {BuyGroup, BuyType, BuyTypeUsage, TypeEffect} from '../buy-type/buy-type.model';
import {BuyTypeService} from '../buy-type/buy-type.service';
import {ConfigType} from '../niopdc-config';

@Component({
    selector: 'jhi-customer-credit-dialog',
    templateUrl: './customer-credit-dialog.component.html'
})
export class CustomerCreditDialogComponent implements OnInit {
    sellContract: SellContractProduct;
    customerCredit: CustomerCredit;
    isSaving: boolean;
    isView: boolean;
    minCredit: number;
    sellcontractproducts: SellContractProduct[];
    currencyRateGroups: CurrencyRateGroup[];
    currencies: Currency[];
    disableCredit: boolean;
    disableAmount: boolean;
    buyGroup = BuyGroup;
    buyTypeUsage = BuyTypeUsage;
    typeEffect = TypeEffect;
    buyTypes: BuyType[];
    buyTypesOptions: BuyType[];
    manualQuota = true;
    isCredit: boolean;
    isCreate = false;
    isEdit = false;
    isUsed = false;
    customerCreditAllowedDay: CustomerCreditAllowedDay;
    tempCustomerCreditAllowedDay: CustomerCreditAllowedDay;
    customerCreditAllowedDays: CustomerCreditAllowedDay[];
    minAmount: number;
    isForeignCurrency = true;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private customerCreditService: CustomerCreditService,
                private buyTypeService: BuyTypeService,
                private customerService: CustomerService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sellContractProductService: SellContractProductService,
                private currencyService: CurrencyService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private eventManager: JhiEventManager) {
        if (activatedRoute.snapshot.queryParams['isCredit'] != null) {
            this.isCredit = Boolean(JSON.parse(activatedRoute.snapshot.queryParams['isCredit']));
        }

    }

    get expressionErrorCredit(): boolean {
        if (this.customerCredit.credit < this.minCredit) {
            this.customerCredit.currentCredit = 0;
            return true;
        } else {
            this.customerCredit.currentCredit = this.customerCredit.credit - this.minCredit;
            return false;
        }
    }

    get expressionErrorAmount(): boolean {
        if (this.customerCredit.amount < this.minAmount) {
            this.customerCredit.currentAmount = 0;
            return true;
        } else {
            this.customerCredit.currentAmount = this.customerCredit.amount - this.minAmount;
            return false;
        }
    }

    ngOnInit() {
        this.isView = View.isView;

        if (this.customerCredit === undefined) {
            this.customerCredit = new CustomerCredit();
        }

        if (!this.isCredit && !this.customerCredit.id) {
            this.buyTypeService.getQuota().subscribe((res: HttpResponse<BuyType>) => {
                this.customerCredit.parentBuyTypeId = res.body.id;
                this.customerCredit.parentBuyGroup = res.body.buyGroup;
                this.customerCredit.parentTypeEffect = res.body.typeEffect;
                this.customerCredit.credit = null;
                this.customerCredit.currentCredit = null;
                this.disableAmount = true;
                this.disableCredit = false;

                if (res.body.buyTypeUsage === BuyTypeUsage[BuyTypeUsage.COST]) {
                    this.disableAmount = true;
                    this.customerCredit.amount = 0;
                } else {
                    this.disableAmount = false;
                    this.disableCredit = false;
                }

            });
        }

        this.customerCredit.startDate = new Date();
        if (this.customerCredit.id) {
            this.customerCreditAllowedDays = this.customerCredit.customerCreditAllowedDays;
            this.customerCreditService.useCustomerCredit(this.customerCredit.id)
                .subscribe(value => {
                    if (value.body) {
                        this.isUsed = true;
                    }
                });
        } else {
            this.customerCredit.active = true;
        }
        if (!this.customerCredit.id && this.customerCredit.productId) {
            this.currencyRateGroupService.findByConfig(ConfigType[ConfigType.NORMAL_SELL])
                .subscribe(value => {
                    this.customerCredit.currencyRateGroupId = value.body.id;
                });
            this.sellContractProductService.find(this.customerCredit.productId).subscribe(value => {
                this.manualQuota = value.body.manualQuota;
            });

        }

        // ...

        if (this.isCredit && this.customerCredit.productId) {
            this.sellContractProductService.find(this.customerCredit.productId).subscribe(res => {

                if (res.body.buyTypes && res.body.buyTypes.length) {
                    this.buyTypesOptions = res.body.buyTypes.filter(item => item.buyGroup != BuyGroup[BuyGroup.CASH]);
                }

            });
        }

        if (this.customerCredit.id) {
            this.minCredit = this.customerCredit.credit - this.customerCredit.currentCredit;
            this.minAmount = this.customerCredit.amount - this.customerCredit.currentAmount;
        } else {
            this.minCredit = 0;
            this.minAmount = 0;
        }

        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                if (!this.customerCredit.id) {
                    this.currencies.forEach(currency => {
                        if (currency.isNationalCurrency) {
                            this.customerCredit.currencyId = currency.id;
                            this.changeCurrency();
                        }
                    });
                }

                if (this.customerCredit.id) {
                    this.changeCurrency();
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        if (!this.customerCredit.productId && this.customerCredit.customerId) {
            this.sellContractProductService.queryByCustomerId(this.customerCredit.customerId)
                .subscribe((res: HttpResponse<SellContractProduct[]>) => {
                    this.sellcontractproducts = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }

        if (this.customerCredit.parentTypeEffect == 'AMOUNT' || this.customerCredit.parentTypeEffect == 'BOTH') {
            if (this.customerCredit.minAmount == null) {
                this.customerCredit.minAmount = this.customerCredit.parentBuyTypeMinAmount;
            }
        }
        if (this.customerCredit.parentTypeEffect == 'CREDIT' || this.customerCredit.parentTypeEffect == 'BOTH') {
            if (this.customerCredit.minCredit == null) {
                this.customerCredit.minCredit = this.customerCredit.parentBuyTypeMinCredit;
            }
        }
    }

    changeCurrency() {
       const currency = this.currencies.find(item => item.id == this.customerCredit.currencyId);
        if (currency && currency.isNationalCurrency) {
         this.isForeignCurrency = false;
        } else {
            this.isForeignCurrency = true;
        }
    }

    clear() {
        this.activeModal.dismiss('cancels');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;

        if (this.customerCreditAllowedDays && this.customerCreditAllowedDays.length > 0) {
            this.customerCredit.customerCreditAllowedDays = this.customerCreditAllowedDays;
        } else {
            this.customerCredit.customerCreditAllowedDays = [];
        }

        if (this.customerCredit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerCreditService.update(this.customerCredit));
        } else {
            this.subscribeToSaveResponse(
                this.customerCreditService.create(this.customerCredit), showNext);
        }
    }

    trackSellContractProductById(index: number, item: SellContractProduct) {
        return item.id;
    }

    trackcurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackBuyTypeById(index: number, item: Currency) {
        return item.id;
    }

    onParentBuyTypeChange(buyTypeId) {
        if (buyTypeId && buyTypeId != 'null') {
            const buyType = this.buyTypesOptions.find(item => item.id == buyTypeId);

            this.customerCredit.parentTypeEffect = buyType.typeEffect;
            this.customerCredit.parentBuyGroup = buyType.buyGroup;
            if (buyType.buyGroup === BuyGroup[BuyGroup.QUOTA]) {
                this.customerCredit.credit = null;
                this.customerCredit.currentCredit = null;
            }

            if (buyType.buyTypeUsage === BuyTypeUsage[BuyTypeUsage.COST]) {
                this.disableAmount = true;
                this.customerCredit.amount = 0;
            } else {
                this.disableAmount = false;
                this.disableCredit = false;
            }
        } else {
            this.customerCredit.parentBuyGroup = null;
            this.customerCredit.parentTypeEffect = null;
        }

    }

    onChangeSellContractProduct(event) {
        console.log(event);
        this.manualQuota = event.manualQuota;
        if (event.buyTypes && event.buyTypes.length) {
            this.buyTypesOptions = event.buyTypes.filter(item => item.buyGroup != BuyGroup[BuyGroup.CASH]);
        }

    }

    onCreateClick() {
        this.isCreate = true;
        this.isEdit = false;
        this.customerCreditAllowedDay = new CustomerCreditAllowedDay();
    }

    addCustomerCreditAllowedDay() {
        if (this.isCreate || this.isEdit) {
            if (!this.customerCreditAllowedDays || !(this.customerCreditAllowedDays.length > 0)) {
                this.customerCreditAllowedDays = [];
            }
        }
        if (this.isCreate) {
            this.customerCreditAllowedDays.push(this.customerCreditAllowedDay);
            this.customerCreditAllowedDay = new CustomerCreditAllowedDay();
            this.isCreate = false;
        } else if (this.isEdit) {
            this.customerCreditAllowedDays[this.customerCreditAllowedDays.indexOf(this.tempCustomerCreditAllowedDay)] = this.customerCreditAllowedDay;
            this.isEdit = false;
        }
        this.customerCreditAllowedDay = new CustomerCreditAllowedDay();
    }

    cancel() {
        this.isCreate = false;
        this.isEdit = false;
        this.customerCreditAllowedDay = new CustomerCreditAllowedDay();
    }

    deleteCustomerCreditAllowedDay(customerCreditAllowedDay) {
        this.customerCreditAllowedDays = this.customerCreditAllowedDays.filter(value => value !== customerCreditAllowedDay);
    }

    editcustomerCreditAllowedDay(customerCreditAllowedDay) {
        this.tempCustomerCreditAllowedDay = customerCreditAllowedDay;
        this.customerCreditAllowedDay = customerCreditAllowedDay;
        this.isEdit = true;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerCredit>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<CustomerCredit>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerCredit, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'customerCreditListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            if (result.customerId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/customer/${result.customerId}/customer-credit(popup:customer-credit-new/customer/${result.customerId})`);
                }, 1000);
            } else if (result.personId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/person/${result.personId}/customer-credit(popup:customer-credit-new/person/${result.personId})`);
                }, 1000);
            }
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-customer-credit-popup',
    template: ''
})
export class CustomerCreditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    isCredit: boolean;

    constructor(private route: ActivatedRoute,
                private activatedRoute: ActivatedRoute,
                private customerCreditPopupService: CustomerCreditPopupService) {
        if (activatedRoute.snapshot.queryParams['isCredit'] != null) {
            this.isCredit = Boolean(JSON.parse(activatedRoute.snapshot.queryParams['isCredit']));
        }
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, params['customerId']);
            } else if (params['personId']) {
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, null, params['personId']);
            } else if (params['sellContractProductId'] && params['sellContractId']) {
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, null, null, params['sellContractId'], params['sellContractProductId']);
            } else {
                console.log('not be...');
            }
        });
        this.isCredit = Boolean(JSON.parse(this.activatedRoute.snapshot.queryParams['isCredit']));
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
