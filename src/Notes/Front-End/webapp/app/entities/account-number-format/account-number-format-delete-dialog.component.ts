import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountNumberFormat } from './account-number-format.model';
import { AccountNumberFormatPopupService } from './account-number-format-popup.service';
import { AccountNumberFormatService } from './account-number-format.service';

@Component({
    selector: 'jhi-account-number-format-delete-dialog',
    templateUrl: './account-number-format-delete-dialog.component.html'
})
export class AccountNumberFormatDeleteDialogComponent {

    accountNumberFormat: AccountNumberFormat;

    constructor(
        private accountNumberFormatService: AccountNumberFormatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountNumberFormatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountNumberFormatListModification',
                content: 'Deleted an accountNumberFormat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-number-format-delete-popup',
    template: ''
})
export class AccountNumberFormatDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountNumberFormatPopupService: AccountNumberFormatPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.accountNumberFormatPopupService
                .open(AccountNumberFormatDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
