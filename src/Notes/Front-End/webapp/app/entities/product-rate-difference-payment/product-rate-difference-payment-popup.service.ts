import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ProductRateDifferencePayment } from './product-rate-difference-payment.model';
import { ProductRateDifferencePaymentService } from './product-rate-difference-payment.service';

@Injectable({ providedIn: 'root' })
export class ProductRateDifferencePaymentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private productRateDifferencePaymentService: ProductRateDifferencePaymentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productRateDifferencePaymentService.find(id)
                    .subscribe((productRateDifferencePaymentResponse: HttpResponse<ProductRateDifferencePayment>) => {
                        const productRateDifferencePayment: ProductRateDifferencePayment = productRateDifferencePaymentResponse.body;
                        productRateDifferencePayment.data = this.datePipe
                            .transform(productRateDifferencePayment.data, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.productRateDifferencePaymentModalRef(component, productRateDifferencePayment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productRateDifferencePaymentModalRef(component, new ProductRateDifferencePayment());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productRateDifferencePaymentModalRef(component: Component, productRateDifferencePayment: ProductRateDifferencePayment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productRateDifferencePayment = productRateDifferencePayment;
        modalRef.result.then(result => {
            this.closeModal(productRateDifferencePayment);
        },reason => {
            this.closeModal(productRateDifferencePayment);
        });
        return modalRef;
    }

    closeModal(productRateDifferencePayment) {
        this.router.navigate(['product-rate-difference-payment', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
