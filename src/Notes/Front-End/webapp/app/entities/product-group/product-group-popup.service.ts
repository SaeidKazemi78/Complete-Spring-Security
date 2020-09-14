import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductGroup } from './product-group.model';
import { ProductGroupService } from './product-group.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ProductGroupPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private productGroupService: ProductGroupService

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
                this.productGroupService.find(id)
                    .subscribe((productGroupResponse: HttpResponse<ProductGroup>) => {
                        const productGroup: ProductGroup = productGroupResponse.body;
                        this.ngbModalRef = this.productGroupModalRef(component, productGroup);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productGroup = new ProductGroup();
                    this.ngbModalRef = this.productGroupModalRef(component, productGroup);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productGroupModalRef(component: Component, productGroup: ProductGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productGroup = productGroup;
        modalRef.result.then(result => {
            this.closeModal(productGroup);
        },reason => {
            this.closeModal(productGroup);
        });
        return modalRef;
    }

    closeModal(productGroup) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
