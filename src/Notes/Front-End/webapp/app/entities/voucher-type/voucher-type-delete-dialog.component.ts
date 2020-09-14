import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherType } from './voucher-type.model';
import { VoucherTypePopupService } from './voucher-type-popup.service';
import { VoucherTypeService } from './voucher-type.service';

@Component({
    selector: 'jhi-voucher-type-delete-dialog',
    templateUrl: './voucher-type-delete-dialog.component.html'
})
export class VoucherTypeDeleteDialogComponent {

    voucherType: VoucherType;

    constructor(
        private voucherTypeService: VoucherTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherTypeListModification',
                content: 'Deleted an voucherType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-type-delete-popup',
    template: ''
})
export class VoucherTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTypePopupService: VoucherTypePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherTypePopupService
                .open(VoucherTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
