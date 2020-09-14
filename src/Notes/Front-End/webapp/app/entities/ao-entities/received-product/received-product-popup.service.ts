import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ReceivedProduct} from './received-product.model';
import {ReceivedProductService} from './received-product.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ReceivedProductPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private receivedProductService: ReceivedProductService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.receivedProductService.find(id).subscribe(receivedProduct => {
                    this.ngbModalRef = this.receivedProductModalRef(component, receivedProduct.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const receivedProduct = new ReceivedProduct();
                    receivedProduct.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.receivedProductModalRef(component, receivedProduct);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    receivedProductModalRef(component: Component, receivedProduct: ReceivedProduct): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.receivedProduct = receivedProduct;
        modalRef.result.then(result => {
            this.closeModal(receivedProduct);
        },reason => {
            this.closeModal(receivedProduct);
        });
        return modalRef;
    }

    closeModal(receivedProduct) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
