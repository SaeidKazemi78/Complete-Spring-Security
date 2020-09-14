import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherItem } from './voucher-item.model';
import { VoucherItemPopupService } from './voucher-item-popup.service';
import { VoucherItemService } from './voucher-item.service';

@Component({
    selector: 'jhi-voucher-item-delete-dialog',
    templateUrl: './voucher-item-delete-dialog.component.html'
})
export class VoucherItemDeleteDialogComponent {

    voucherItem: VoucherItem;

    constructor(
        private voucherItemService: VoucherItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherItemListModification',
                content: 'Deleted an voucherItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-item-delete-popup',
    template: ''
})
export class VoucherItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherItemPopupService: VoucherItemPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherItemPopupService
                .open(VoucherItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
