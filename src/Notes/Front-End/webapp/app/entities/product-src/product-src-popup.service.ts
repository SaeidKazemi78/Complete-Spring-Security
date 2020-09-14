import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProductSrc } from './product-src.model';
import { ProductSrcService } from './product-src.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ProductSrcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private productSrcService: ProductSrcService

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
                this.productSrcService.find(id).subscribe(productSrcResponse => {
                    const productSrc: ProductSrc = productSrcResponse.body;
                    this.ngbModalRef = this.productSrcModalRef(component, productSrc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productSrc = new ProductSrc();
                    this.ngbModalRef = this.productSrcModalRef(component, productSrc);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productSrcModalRef(component: Component, productSrc: ProductSrc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productSrc = productSrc;
        modalRef.result.then(result => {
            this.closeModal(productSrc);
        },reason => {
            this.closeModal(productSrc);
        });
        return modalRef;
    }

    closeModal(productSrc) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
