import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NiopdcBankAccount } from './niopdc-bank-account.model';
import { NiopdcBankAccountPopupService } from './niopdc-bank-account-popup.service';
import { NiopdcBankAccountService } from './niopdc-bank-account.service';

@Component({
    selector: 'jhi-niopdc-bank-account-delete-dialog',
    templateUrl: './niopdc-bank-account-delete-dialog.component.html'
})
export class NiopdcBankAccountDeleteDialogComponent {

    niopdcBankAccount: NiopdcBankAccount;

    constructor(
        private niopdcBankAccountService: NiopdcBankAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niopdcBankAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'niopdcBankAccountListModification',
                content: 'Deleted an niopdcBankAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niopdc-bank-account-delete-popup',
    template: ''
})
export class NiopdcBankAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcBankAccountPopupService: NiopdcBankAccountPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.niopdcBankAccountPopupService
                .open(NiopdcBankAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
