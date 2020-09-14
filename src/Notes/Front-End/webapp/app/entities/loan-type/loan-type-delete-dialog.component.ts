import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoanType } from './loan-type.model';
import { LoanTypePopupService } from './loan-type-popup.service';
import { LoanTypeService } from './loan-type.service';

@Component({
    selector: 'jhi-loan-type-delete-dialog',
    templateUrl: './loan-type-delete-dialog.component.html'
})
export class LoanTypeDeleteDialogComponent {

    loanType: LoanType;

    constructor(
        private loanTypeService: LoanTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loanTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loanTypeListModification',
                content: 'Deleted an loanType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loan-type-delete-popup',
    template: ''
})
export class LoanTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanTypePopupService: LoanTypePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.loanTypePopupService
                .open(LoanTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
