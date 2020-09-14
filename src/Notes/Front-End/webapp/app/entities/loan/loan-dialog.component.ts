import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Loan} from './loan.model';
import {LoanPopupService} from './loan-popup.service';
import {LoanService} from './loan.service';
import {LoanType, LoanTypeService} from '../loan-type';
import {CustomerPerson} from 'app/shared/selectors/sell-contract-customer-person-selector/sell-contract-customer-person-selector.model';
import {PaymentPeriod} from 'app/entities/bill/bill.model';
import {fromGregorian, getDaysPerMonth, jalaliToGregorian, setJalaliMonth} from 'app/shared/ng2-datetimepicker-jalali/jalali';
import {BillService} from 'app/entities/bill';

@Component({
    selector: 'jhi-loan-dialog',
    templateUrl: './loan-dialog.component.html'
})
export class LoanDialogComponent implements OnInit {

    loan: Loan;
    isSaving: boolean;
    isView: boolean;
    customerPerson: CustomerPerson;
    loantypes: LoanType[];
    editLimit: boolean;
    dateNow: Date;
    minDate:Date

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private loanService: LoanService,
        private loanTypeService: LoanTypeService,
        private eventManager: JhiEventManager,
        private billService: BillService
    ) {
    }

    getInstallmentPrice() {
        if (this.loantypes) {
            const loanType = this.loantypes.find(value => value.id === this.loan.loanTypeId);
            if (loanType && this.loan.amount && this.loan.installmentCount) {
                const interest = loanType.interest;
                if (interest > 0) {
                    const pow = Math.pow((1 + (interest / 1200)), this.loan.installmentCount);
                    const top = this.loan.amount * (interest / 1200) * pow;
                    const down = pow - 1;
                    return Math.floor(top / down);
                } else {
                    return Math.floor(this.loan.amount / this.loan.installmentCount);
                }
            }
        }
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth()+1);

        this.loanTypeService.query()
            .subscribe((res: HttpResponse<LoanType[]>) => {
                    const now = new Date();
                    this.loantypes = res.body.filter(value => value.id === this.loan.loanTypeId ||
                        (value.startDate <= now && value.finishDate >= now));
                },
                (res: HttpErrorResponse) => this.onError(res.message));

        this.dateNow = new Date();
        if (this.loan.id) {
            if (this.loan.firstPaymentDate <= this.dateNow || this.loan.havePayment) {
                this.editLimit = true;
            }
        }


    }



    changeCustomerPerson(data) {
        if (data != null) {
            this.loan.customerId = data.customerId;
            /* this.billService.findLastByCustomerId(data.customerId)
                 .subscribe(value => {

                 });*/
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.loan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loanService.update(this.loan));
        } else {
            this.subscribeToSaveResponse(
                this.loanService.create(this.loan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Loan>>) {
        result.subscribe((res: HttpResponse<Loan>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Loan) {
        this.eventManager.broadcast({name: 'loanListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLoanTypeById(index: number, item: LoanType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-loan-popup',
    template: ''
})
export class LoanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanPopupService: LoanPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.loanPopupService
                    .open(LoanDialogComponent as Component, params['id']);
            } else {
                this.loanPopupService
                    .open(LoanDialogComponent as Component);
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
