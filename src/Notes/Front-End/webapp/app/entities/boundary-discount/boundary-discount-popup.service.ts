import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BoundaryDiscount } from './boundary-discount.model';
import { BoundaryDiscountService } from './boundary-discount.service';

@Injectable({ providedIn: 'root' })
export class BoundaryDiscountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private boundaryDiscountService: BoundaryDiscountService

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
                this.boundaryDiscountService.find(id).subscribe(boundaryDiscount => {
                    this.ngbModalRef = this.boundaryDiscountModalRef(component, boundaryDiscount.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const boundaryDiscount = new BoundaryDiscount();
                    this.ngbModalRef = this.boundaryDiscountModalRef(component, boundaryDiscount);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    boundaryDiscountModalRef(component: Component, boundaryDiscount: BoundaryDiscount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.boundaryDiscount = boundaryDiscount;
        modalRef.result.then(result => {
            this.closeModal(boundaryDiscount);
        },reason => {
            this.closeModal(boundaryDiscount);
        });
        return modalRef;
    }

    closeModal(boundaryDiscount) {
        this.router.navigate(['boundary-discount', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
