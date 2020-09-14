import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductRateDifferencePayment } from './product-rate-difference-payment.model';
import { ProductRateDifferencePaymentService } from './product-rate-difference-payment.service';

@Component({
    selector: 'jhi-product-rate-difference-payment-detail',
    templateUrl: './product-rate-difference-payment-detail.component.html'
})
export class ProductRateDifferencePaymentDetailComponent implements OnInit, OnDestroy {

    productRateDifferencePayment: ProductRateDifferencePayment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productRateDifferencePaymentService: ProductRateDifferencePaymentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInProductRateDifferencePayments();
    }

    load(id) {
        this.productRateDifferencePaymentService.find(id)
            .subscribe((productRateDifferencePaymentResponse: HttpResponse<ProductRateDifferencePayment>) => {
                this.productRateDifferencePayment = productRateDifferencePaymentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductRateDifferencePayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productRateDifferencePaymentListModification',response => this.load(this.productRateDifferencePayment.id)
        );
    }
}
