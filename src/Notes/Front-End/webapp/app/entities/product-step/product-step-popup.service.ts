import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProductStep } from './product-step.model';
import { ProductStepService } from './product-step.service';

@Injectable({ providedIn: 'root' })
export class ProductStepPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private productStepService: ProductStepService
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
                this.productStepService.find(id).subscribe(productStepResponse => {
                    const productStep: ProductStep = productStepResponse.body;
                    this.ngbModalRef = this.productStepModalRef(component, productStep);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productStep = new ProductStep();
                    this.ngbModalRef = this.productStepModalRef(component, productStep);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productStepModalRef(component: Component, productStep: ProductStep): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productStep = productStep;
        modalRef.result.then(result => {
            this.closeModal(productStep);
        },reason => {
            this.closeModal(productStep);
        });
        return modalRef;
    }

    closeModal(productStep) {
        this.router.navigate(['product-step', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
