import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductRateDifferencePayment } from './product-rate-difference-payment.model';
import { ProductRateDifferencePaymentPopupService } from './product-rate-difference-payment-popup.service';
import { ProductRateDifferencePaymentService } from './product-rate-difference-payment.service';
import { ProductRateDifference, ProductRateDifferenceService } from '../product-rate-difference';

@Component({
    selector: 'jhi-product-rate-difference-payment-dialog',
    templateUrl: './product-rate-difference-payment-dialog.component.html'
})
export class ProductRateDifferencePaymentDialogComponent implements OnInit {

    productRateDifferencePayment: ProductRateDifferencePayment;
    isSaving: boolean;

    productratedifferences: ProductRateDifference[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productRateDifferencePaymentService: ProductRateDifferencePaymentService,
        private productRateDifferenceService: ProductRateDifferenceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productRateDifferenceService.query()
            .subscribe((res: HttpResponse<ProductRateDifference[]>) => { this.productratedifferences = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productRateDifferencePayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productRateDifferencePaymentService.update(this.productRateDifferencePayment));
        } else {
            this.subscribeToSaveResponse(
                this.productRateDifferencePaymentService.create(this.productRateDifferencePayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductRateDifferencePayment>>) {
        result.subscribe((res: HttpResponse<ProductRateDifferencePayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductRateDifferencePayment) {
        this.eventManager.broadcast({ name: 'productRateDifferencePaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductRateDifferenceById(index: number, item: ProductRateDifference) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-rate-difference-payment-popup',
    template: ''
})
export class ProductRateDifferencePaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRateDifferencePaymentPopupService: ProductRateDifferencePaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.productRateDifferencePaymentPopupService
                    .open(ProductRateDifferencePaymentDialogComponent as Component, params['id']);
            } else {
                this.productRateDifferencePaymentPopupService
                    .open(ProductRateDifferencePaymentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
