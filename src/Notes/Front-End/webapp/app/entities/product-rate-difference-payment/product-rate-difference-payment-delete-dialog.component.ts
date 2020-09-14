import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductRateDifferencePayment } from './product-rate-difference-payment.model';
import { ProductRateDifferencePaymentPopupService } from './product-rate-difference-payment-popup.service';
import { ProductRateDifferencePaymentService } from './product-rate-difference-payment.service';

@Component({
    selector: 'jhi-product-rate-difference-payment-delete-dialog',
    templateUrl: './product-rate-difference-payment-delete-dialog.component.html'
})
export class ProductRateDifferencePaymentDeleteDialogComponent {

    productRateDifferencePayment: ProductRateDifferencePayment;

    constructor(
        private productRateDifferencePaymentService: ProductRateDifferencePaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productRateDifferencePaymentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productRateDifferencePaymentListModification',
                content: 'Deleted an productRateDifferencePayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-rate-difference-payment-delete-popup',
    template: ''
})
export class ProductRateDifferencePaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRateDifferencePaymentPopupService: ProductRateDifferencePaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productRateDifferencePaymentPopupService
                .open(ProductRateDifferencePaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
