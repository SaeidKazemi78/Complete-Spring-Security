import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NiopdcBankAccountType } from './niopdc-bank-account-type.model';
import { NiopdcBankAccountTypePopupService } from './niopdc-bank-account-type-popup.service';
import { NiopdcBankAccountTypeService } from './niopdc-bank-account-type.service';

@Component({
    selector: 'jhi-niopdc-bank-account-type-delete-dialog',
    templateUrl: './niopdc-bank-account-type-delete-dialog.component.html'
})
export class NiopdcBankAccountTypeDeleteDialogComponent {

    niopdcBankAccountType: NiopdcBankAccountType;

    constructor(
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niopdcBankAccountTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'niopdcBankAccountTypeListModification',
                content: 'Deleted an niopdcBankAccountType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niopdc-bank-account-type-delete-popup',
    template: ''
})
export class NiopdcBankAccountTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcBankAccountTypePopupService: NiopdcBankAccountTypePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.niopdcBankAccountTypePopupService
                .open(NiopdcBankAccountTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
