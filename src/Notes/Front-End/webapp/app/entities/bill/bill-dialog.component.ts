import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Bill, PaymentPeriod} from './bill.model';
import {BillPopupService} from './bill-popup.service';
import {BillService} from './bill.service';
import {CustomerSellContract, SellContractService} from '../sell-contract';
import {CustomerPerson} from 'app/shared/selectors/sell-contract-customer-person-selector/sell-contract-customer-person-selector.model';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {fromGregorian, getDaysPerMonth} from 'app/shared/ng2-datetimepicker-jalali/jalali';

@Component({
    selector: 'jhi-bill-dialog',
    templateUrl: './bill-dialog.component.html'
})
export class BillDialogComponent implements OnInit {
    PaymentPeriod = PaymentPeriod;
    customerPerson: CustomerPerson;
    bill: Bill;
    isSaving: boolean;
    isView: boolean;

    years: number[] = [];
    seasons: number[] = [];
    months: number[] = [];
    days: number[] = [];
    isActive = true;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billService: BillService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bill.paymentPeriod = this.PaymentPeriod[PaymentPeriod.MONTH];
        this.paymentPeriodChanged();
    }

    getMonthForSeason(month) {
        return ((Math.floor((month - 1) / 3)) * 3) + 1;
    }

    getSeasonByMonth(month) {
        return (Math.floor((month - 1) / 3)) + 1;
    }

    paymentPeriodChanged() {
        let dateNow = fromGregorian(new Date());
        let maxYear = dateNow.year;

        if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.YEAR] ||
            dateNow.month < 4) {
            maxYear -= 1;
        }

        this.years = [];
        for (let i = maxYear - 10; i <= maxYear; i++) {
            this.years.push(i);
        }

        if (!this.bill.year) {
            this.bill.year = maxYear;
        }
        this.yearChanged();

    }

    yearChanged() {
        let dateNow = fromGregorian(new Date());
        let maxMonth = 12;
        let maxSeason = 4;
        if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.YEAR]) {
            return;
        } else if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.MONTH] ||
            this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.DAY]) {

            if (this.bill.year === dateNow.year) {
                maxMonth = dateNow.month;
                if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.MONTH]) {
                    maxMonth -= 1;
                }
            }

            if (this.bill.month > maxMonth) {
                this.bill.month = null;
            }


            this.months = [];
            for (let i = 1; i <= maxMonth; i++) {
                this.months.push(i);
            }

            if (!this.bill.month && this.bill.id) {
                let billDate = fromGregorian(new Date(this.bill.startDate));
                this.bill.month = billDate.month;
            } else {
                this.bill.month = maxMonth;
            }

            this.monthChanged();

        } else if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.SEASON]) {
            if (this.bill.year === dateNow.year && dateNow.month > 3) {
                maxSeason = this.getSeasonByMonth(dateNow.month) - 1;
            }

            if (this.bill.season > maxSeason) {
                this.bill.season = null;
            }

            this.seasons = [];
            for (let i = 1; i <= maxSeason; i++) {
                this.seasons.push(i);
            }

            if (!this.seasons) {
                this.bill.season = maxMonth;
            }
        }
    }

    monthChanged() {

        if (this.bill.paymentPeriod === this.PaymentPeriod[PaymentPeriod.DAY]) {
            let dateNow = fromGregorian(new Date());
            let maxDay = getDaysPerMonth(dateNow.month, dateNow.year);
            if (this.bill.year === dateNow.year && this.bill.month === dateNow.month) {
                maxDay = dateNow.day - 1;
            }

            if (this.bill.day > maxDay) {
                this.bill.day = null;
            }

            this.days = [];
            for (let i = 1; i <= maxDay; i++) {
                this.days.push(i);
            }

            if (!this.bill.day) {
                this.bill.day = maxDay;
            }
        }
    }

    changeCustomerPerson(data) {
        if (data != null) {
            this.bill.customerId = data.customerId;
            // this.bill.personId = data.personId;
            this.bill.sellContractId = data.sellContractId;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bill>>) {
        result.subscribe((res: HttpResponse<Bill>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bill) {
        this.eventManager.broadcast({name: 'billListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bill-popup',
    template: ''
})
export class BillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.billPopupService
                    .open(BillDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillDialogComponent as Component);
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
