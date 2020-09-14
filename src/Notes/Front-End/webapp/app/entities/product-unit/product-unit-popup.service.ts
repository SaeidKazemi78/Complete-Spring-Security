import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductUnit } from './product-unit.model';
import { ProductUnitService } from './product-unit.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ProductUnitPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productUnitService: ProductUnitService

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
                this.productUnitService.find(id)
                    .subscribe((productUnitResponse: HttpResponse<ProductUnit>) => {
                        const productUnit: ProductUnit = productUnitResponse.body;
                        this.ngbModalRef = this.productUnitModalRef(component, productUnit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productUnitModalRef(component, new ProductUnit());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productUnitModalRef(component: Component, productUnit: ProductUnit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productUnit = productUnit;
        modalRef.result.then(result => {
            this.closeModal(productUnit);
        },reason => {
            this.closeModal(productUnit);
        });
        return modalRef;
    }

    closeModal(productUnit) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
