import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountNumberItems } from './account-number-items.model';
import { AccountNumberItemsPopupService } from './account-number-items-popup.service';
import { AccountNumberItemsService } from './account-number-items.service';

@Component({
    selector: 'jhi-account-number-items-delete-dialog',
    templateUrl: './account-number-items-delete-dialog.component.html'
})
export class AccountNumberItemsDeleteDialogComponent {

    accountNumberItems: AccountNumberItems;

    constructor(
        private accountNumberItemsService: AccountNumberItemsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountNumberItemsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountNumberItemsListModification',
                content: 'Deleted an accountNumberItems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-number-items-delete-popup',
    template: ''
})
export class AccountNumberItemsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountNumberItemsPopupService: AccountNumberItemsPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.accountNumberItemsPopupService
                .open(AccountNumberItemsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
