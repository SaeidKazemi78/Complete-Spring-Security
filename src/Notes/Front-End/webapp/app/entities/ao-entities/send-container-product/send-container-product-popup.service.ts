import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {SendContainerProduct} from './send-container-product.model';
import {SendContainerProductService} from './send-container-product.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SendContainerProductPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sendContainerProductService: SendContainerProductService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotContainerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sendContainerProductService.find(id).subscribe((sendContainerProduct: HttpResponse<SendContainerProduct>) => {
                    this.ngbModalRef = this.sendContainerProductModalRef(component, sendContainerProduct.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sendContainerProduct = new SendContainerProduct();
                    sendContainerProduct.dayDepotContainerId = dayDepotContainerId;
                    this.ngbModalRef = this.sendContainerProductModalRef(component, sendContainerProduct);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sendContainerProductModalRef(component: Component, sendContainerProduct: SendContainerProduct): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sendContainerProduct = sendContainerProduct;
        modalRef.result.then(result => {
            this.closeModal(sendContainerProduct);
        },reason => {
            this.closeModal(sendContainerProduct);
        });
        return modalRef;
    }

    closeModal(sendContainerProduct) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
