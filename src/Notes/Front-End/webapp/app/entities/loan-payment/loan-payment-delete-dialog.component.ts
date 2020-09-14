import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoanPayment } from './loan-payment.model';
import { LoanPaymentPopupService } from './loan-payment-popup.service';
import { LoanPaymentService } from './loan-payment.service';

@Component({
    selector: 'jhi-loan-payment-delete-dialog',
    templateUrl: './loan-payment-delete-dialog.component.html'
})
export class LoanPaymentDeleteDialogComponent {

    loanPayment: LoanPayment;

    constructor(
        private loanPaymentService: LoanPaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loanPaymentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loanPaymentListModification',
                content: 'Deleted an loanPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loan-payment-delete-popup',
    template: ''
})
export class LoanPaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanPaymentPopupService: LoanPaymentPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.loanPaymentPopupService
                .open(LoanPaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
