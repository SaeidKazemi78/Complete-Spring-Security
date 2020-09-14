import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProductRateDifference } from './product-rate-difference.model';
import { ProductRateDifferenceService } from './product-rate-difference.service';

@Injectable({ providedIn: 'root' })
export class ProductRateDifferencePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private productRateDifferenceService: ProductRateDifferenceService

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
                this.productRateDifferenceService.find(id).subscribe(productRateDifferenceResponse => {
                    const productRateDifference: ProductRateDifference = productRateDifferenceResponse.body;
                    this.ngbModalRef = this.productRateDifferenceModalRef(component, productRateDifference);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productRateDifference = new ProductRateDifference();
                    this.ngbModalRef = this.productRateDifferenceModalRef(component, productRateDifference);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productRateDifferenceModalRef(component: Component, productRateDifference: ProductRateDifference): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bankAccount = productRateDifference;
        modalRef.result.then(result => {
            this.closeModal(productRateDifference);
        },reason => {
            this.closeModal(productRateDifference);
        });
        return modalRef;
    }

    closeModal(productRateDifference) {
        this.router.navigate(['product-rate-difference', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
