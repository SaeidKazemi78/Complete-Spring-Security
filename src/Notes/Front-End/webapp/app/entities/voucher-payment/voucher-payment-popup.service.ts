import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { VoucherPayment } from './voucher-payment.model';
import { VoucherPaymentService } from './voucher-payment.service';

@Injectable({ providedIn: 'root' })
export class VoucherPaymentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private voucherPaymentService: VoucherPaymentService

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
                this.voucherPaymentService.find(id)
                    .subscribe((voucherPaymentResponse: HttpResponse<VoucherPayment>) => {
                        const voucherPayment: VoucherPayment = voucherPaymentResponse.body;
                        this.ngbModalRef = this.voucherPaymentModalRef(component, voucherPayment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.voucherPaymentModalRef(component, new VoucherPayment());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherPaymentModalRef(component: Component, voucherPayment: VoucherPayment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherPayment = voucherPayment;
        modalRef.result.then((result) => {
            this.closeModal(voucherPayment);
        }, (reason) => {
            this.closeModal(voucherPayment);
        });
        return modalRef;
    }

    closeModal(voucherPayment) {
        this.router.navigate(['voucher-payment', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
