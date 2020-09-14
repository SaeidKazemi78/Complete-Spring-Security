import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Loan } from './loan.model';
import { LoanPopupService } from './loan-popup.service';
import { LoanService } from './loan.service';

@Component({
    selector: 'jhi-loan-delete-dialog',
    templateUrl: './loan-delete-dialog.component.html'
})
export class LoanDeleteDialogComponent {

    loan: Loan;

    constructor(
        private loanService: LoanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loanListModification',
                content: 'Deleted an loan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loan-delete-popup',
    template: ''
})
export class LoanDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanPopupService: LoanPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.loanPopupService
                .open(LoanDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
