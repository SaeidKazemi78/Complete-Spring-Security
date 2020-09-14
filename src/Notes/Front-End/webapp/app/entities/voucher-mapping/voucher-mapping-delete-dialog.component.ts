import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherMapping } from './voucher-mapping.model';
import { VoucherMappingPopupService } from './voucher-mapping-popup.service';
import { VoucherMappingService } from './voucher-mapping.service';

@Component({
    selector: 'jhi-voucher-mapping-delete-dialog',
    templateUrl: './voucher-mapping-delete-dialog.component.html'
})
export class VoucherMappingDeleteDialogComponent {

    voucherMapping: VoucherMapping;

    constructor(
        private voucherMappingService: VoucherMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherMappingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherMappingListModification',
                content: 'Deleted an voucherMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-mapping-delete-popup',
    template: ''
})
export class VoucherMappingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherMappingPopupService: VoucherMappingPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherMappingPopupService
                .open(VoucherMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
