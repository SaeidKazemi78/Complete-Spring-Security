import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherMaster } from './voucher-master.model';
import { VoucherMasterPopupService } from './voucher-master-popup.service';
import { VoucherMasterService } from './voucher-master.service';

@Component({
    selector: 'jhi-voucher-master-delete-dialog',
    templateUrl: './voucher-master-delete-dialog.component.html'
})
export class VoucherMasterDeleteDialogComponent {

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

    confirmDelete(id: number) {
        this.voucherMasterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherMasterListModification',
                content: 'Deleted an voucherMaster'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-master-delete-popup',
    template: ''
})
export class VoucherMasterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherMasterPopupService: VoucherMasterPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherMasterPopupService
                .open(VoucherMasterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
