import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {SendProduct} from './send-product.model';
import {SendProductService} from './send-product.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SendProductPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sendProductService: SendProductService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sendProductService.find(id).subscribe(sendProduct => {
                    this.ngbModalRef = this.sendProductModalRef(component, sendProduct.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sendProduct = new SendProduct();
                    sendProduct.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.sendProductModalRef(component, sendProduct);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sendProductModalRef(component: Component, sendProduct: SendProduct): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sendProduct = sendProduct;
        modalRef.result.then(result => {
            this.closeModal(sendProduct);
        },reason => {
            this.closeModal(sendProduct);
        });
        return modalRef;
    }

    closeModal(sendProduct) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
