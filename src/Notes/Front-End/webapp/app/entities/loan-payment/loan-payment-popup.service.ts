import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LoanPayment } from './loan-payment.model';
import { LoanPaymentService } from './loan-payment.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LoanPaymentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private loanPaymentService: LoanPaymentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, loanId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.loanPaymentService.find(id).subscribe(loanPaymentResponse => {
                    const loanPayment: LoanPayment = loanPaymentResponse.body;
                    this.ngbModalRef = this.loanPaymentModalRef(component, loanPayment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const loanPayment = new LoanPayment();
                    loanPayment.loanId = loanId;
                    this.ngbModalRef = this.loanPaymentModalRef(component, loanPayment);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    loanPaymentModalRef(component: Component, loanPayment: LoanPayment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.loanPayment = loanPayment;
        modalRef.result.then(result => {
            this.closeModal(loanPayment);
        },reason => {
            this.closeModal(loanPayment);
        });
        return modalRef;
    }

    closeModal(loanPayment) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
