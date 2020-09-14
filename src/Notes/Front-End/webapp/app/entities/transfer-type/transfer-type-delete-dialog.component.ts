import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransferType } from './transfer-type.model';
import { TransferTypePopupService } from './transfer-type-popup.service';
import { TransferTypeService } from './transfer-type.service';

@Component({
    selector: 'jhi-transfer-type-delete-dialog',
    templateUrl: './transfer-type-delete-dialog.component.html'
})
export class TransferTypeDeleteDialogComponent {

    transferType: TransferType;

    constructor(
        private transferTypeService: TransferTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transferTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transferTypeListModification',
                content: 'Deleted an transferType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfer-type-delete-popup',
    template: ''
})
export class TransferTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferTypePopupService: TransferTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.transferTypePopupService
                .open(TransferTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
