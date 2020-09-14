import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRating } from './customer-rating.model';
import { CustomerRatingService } from './customer-rating.service';

@Injectable({ providedIn: 'root' })
export class CustomerRatingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private customerRatingService: CustomerRatingService

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
                this.customerRatingService.find(id).subscribe(customerRating => {
                    this.ngbModalRef = this.customerRatingModalRef(component, customerRating.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerRating = new CustomerRating();
                    this.ngbModalRef = this.customerRatingModalRef(component, customerRating);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerRatingModalRef(component: Component, customerRating: CustomerRating): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerRating = customerRating;
        modalRef.result.then(result => {
            this.closeModal(customerRating);
        },reason => {
            this.closeModal(customerRating);
        });
        return modalRef;
    }

    closeModal(customerRating) {
        this.router.navigate(['customer-rating', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
