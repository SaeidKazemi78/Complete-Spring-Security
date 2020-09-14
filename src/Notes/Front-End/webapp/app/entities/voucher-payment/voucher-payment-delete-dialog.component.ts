import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherPayment } from './voucher-payment.model';
import { VoucherPaymentPopupService } from './voucher-payment-popup.service';
import { VoucherPaymentService } from './voucher-payment.service';

@Component({
    selector: 'jhi-voucher-payment-delete-dialog',
    templateUrl: './voucher-payment-delete-dialog.component.html'
})
export class VoucherPaymentDeleteDialogComponent {

    voucherPayment: VoucherPayment;

    constructor(
        private voucherPaymentService: VoucherPaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherPaymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherPaymentListModification',
                content: 'Deleted an voucherPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-payment-delete-popup',
    template: ''
})
export class VoucherPaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherPaymentPopupService: VoucherPaymentPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherPaymentPopupService
                .open(VoucherPaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
