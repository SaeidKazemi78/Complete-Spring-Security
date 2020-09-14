import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherTypeGroup } from './voucher-type-group.model';
import { VoucherTypeGroupPopupService } from './voucher-type-group-popup.service';
import { VoucherTypeGroupService } from './voucher-type-group.service';

@Component({
    selector: 'jhi-voucher-type-group-delete-dialog',
    templateUrl: './voucher-type-group-delete-dialog.component.html'
})
export class VoucherTypeGroupDeleteDialogComponent {

    voucherTypeGroup: VoucherTypeGroup;

    constructor(
        private voucherTypeGroupService: VoucherTypeGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherTypeGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherTypeGroupListModification',
                content: 'Deleted an voucherTypeGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-type-group-delete-popup',
    template: ''
})
export class VoucherTypeGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTypeGroupPopupService: VoucherTypeGroupPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherTypeGroupPopupService
                .open(VoucherTypeGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
