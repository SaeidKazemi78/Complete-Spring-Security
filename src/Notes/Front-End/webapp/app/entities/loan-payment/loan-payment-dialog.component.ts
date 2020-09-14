import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {LoanPayment} from './loan-payment.model';
import {LoanPaymentPopupService} from './loan-payment-popup.service';
import {LoanPaymentService} from './loan-payment.service';
import {Loan, LoanService} from '../loan';

@Component({
    selector: 'jhi-loan-payment-dialog',
    templateUrl: './loan-payment-dialog.component.html'
})
export class LoanPaymentDialogComponent implements OnInit {

    loanPayment: LoanPayment;
    isSaving: boolean;
    isView: boolean;

    loans: Loan[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private loanPaymentService: LoanPaymentService,
        private loanService: LoanService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.loanService.query()
            .subscribe((res: HttpResponse<Loan[]>) => {
                this.loans = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.loanPayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loanPaymentService.update(this.loanPayment));
        } else {
            this.subscribeToSaveResponse(
                this.loanPaymentService.create(this.loanPayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LoanPayment>>) {
        result.subscribe((res: HttpResponse<LoanPayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LoanPayment) {
        this.eventManager.broadcast({name: 'loanPaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLoanById(index: number, item: Loan) {
        return item.id;
    }

}

@Component({
    selector: 'jhi-loan-payment-popup',
    template: ''
})
export class LoanPaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanPaymentPopupService: LoanPaymentPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.loanPaymentPopupService
                    .open(LoanPaymentDialogComponent as Component, params['id']);
            } else if (params['loanId']) {
                this.loanPaymentPopupService
                    .open(LoanPaymentDialogComponent as Component, null, params['loanId']);
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
