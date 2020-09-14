import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ExportPiCreditPopupService} from './export-pi-credit-popup.service';
import {ExportPi, ExportPiService} from '../export-pi';
import {CustomerCredit, CustomerCreditAllowedDay, CustomerCreditService} from 'app/entities/customer-credit';
import {ExportLetter, ExportLetterService} from 'app/entities/export-letter';
import {Currency, CurrencyService} from 'app/entities/currency';
import {CurrencyRateGroup, CurrencyRateGroupService} from 'app/entities/currency-rate-group';
import {BuyGroup, BuyType, BuyTypeService, BuyTypeUsage, TypeEffect} from 'app/entities/buy-type';

@Component({
    selector: 'jhi-export-pi-payment-dialog',
    templateUrl: './export-pi-credit-dialog.component.html'
})
export class ExportPiCreditDialogComponent implements OnInit {

    customerCredit: CustomerCredit;
    isSaving: boolean;
    isView: boolean;
    isUsed = false;

    isCreate = false;
    isEdit = false;
    customerCreditAllowedDay: CustomerCreditAllowedDay;
    tempCustomerCreditAllowedDay: CustomerCreditAllowedDay;
    customerCreditAllowedDays: CustomerCreditAllowedDay[];
    minCredit: number;
    minAmount: number;
    currencyRateGroups: CurrencyRateGroup[];
    currencies: Currency[];
    disableCredit: boolean;
    disableAmount: boolean;
    buyGroup = BuyGroup;
    buyTypeUsage = BuyTypeUsage;
    typeEffect = TypeEffect;
    buyTypesOptions: BuyType[];
    manualQuota = true;
    exportLetter: ExportLetter;
    isForeignCurrency = true;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerCreditService: CustomerCreditService,
        private exportLetterService: ExportLetterService,
        private currencyService: CurrencyService,
        private buyTypeService: BuyTypeService,
        private currencyRateGroupService: CurrencyRateGroupService,
        private exportPiService: ExportPiService,
        private eventManager: JhiEventManager
    ) {
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
        this.isSaving = false;

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

        if (this.customerCredit.id) {
            this.minCredit = this.customerCredit.credit - this.customerCredit.currentCredit;
            this.minAmount = this.customerCredit.amount - this.customerCredit.currentAmount;
        } else {
            this.minCredit = 0;
            this.minAmount = 0;
        }
        this.buyTypeService.getAllCredit()
            .subscribe((res: HttpResponse<BuyType[]>) => {
                this.buyTypesOptions = res.body;
            });

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

        if (this.customerCredit.parentTypeEffect === 'AMOUNT' || this.customerCredit.parentTypeEffect === 'BOTH') {
            if (this.customerCredit.minAmount == null) {
                this.customerCredit.minAmount = this.customerCredit.parentBuyTypeMinAmount;
            }
        }
        if (this.customerCredit.parentTypeEffect === 'CREDIT' || this.customerCredit.parentTypeEffect === 'BOTH') {
            if (this.customerCredit.minCredit == null) {
                this.customerCredit.minCredit = this.customerCredit.parentBuyTypeMinCredit;
            }
        }
        this.exportLetterService.findByExportPi(this.customerCredit.exportPiId).subscribe(
            (exportLetter: HttpResponse<ExportLetter>) => {
                this.exportLetter = exportLetter.body;
            }
        );

    }

    changeCurrency() {
        const currency = this.currencies.find(item => item.id === this.customerCredit.currencyId);
        this.isForeignCurrency = !(currency && currency.isNationalCurrency);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
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
                this.customerCreditService.create(this.customerCredit));
        }
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
        if (buyTypeId && buyTypeId !== 'null') {
            const buyType = this.buyTypesOptions.find(item => item.id === buyTypeId);

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerCredit>>) {
        result.subscribe((res: HttpResponse<CustomerCredit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerCredit) {
        this.eventManager.broadcast({name: 'exportPiCreditListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-export-pi-credit-popup',
    template: ''
})
export class ExportPiCreditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiCreditPopupService: ExportPiCreditPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.exportPiCreditPopupService
                    .open(ExportPiCreditDialogComponent as Component, params['id']);
            } else if (params['exportPiId']) {
                this.exportPiCreditPopupService
                    .open(ExportPiCreditDialogComponent as Component, null, params['exportPiId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
