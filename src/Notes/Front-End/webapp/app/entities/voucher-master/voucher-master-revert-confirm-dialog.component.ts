import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherMaster } from './voucher-master.model';
import { VoucherMasterPopupService } from './voucher-master-popup.service';
import { VoucherMasterService } from './voucher-master.service';

@Component({
    selector: 'jhi-voucher-master-revert-confirm-dialog',
    templateUrl: './voucher-master-revert-confirm-dialog.component.html'
})
export class VoucherMasterRevertConfirmDialogComponent {

    voucherMaster: VoucherMaster;

    constructor(
        private voucherMasterService: VoucherMasterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    revertConfirm(id: number) {
        this.voucherMasterService.revertConfirm(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherMasterListModification',
                content: 'revert confirm an voucherMaster'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-master-revert-confirm-popup',
    template: ''
})
export class VoucherMasterRevertConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherMasterPopupService: VoucherMasterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherMasterPopupService
                .open(VoucherMasterRevertConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
