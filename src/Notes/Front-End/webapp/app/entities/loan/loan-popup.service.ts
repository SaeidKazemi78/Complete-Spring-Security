import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Loan } from './loan.model';
import { LoanService } from './loan.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LoanPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private loanService: LoanService

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
                this.loanService.find(id).subscribe(loanResponse => {
                    const loan: Loan = loanResponse.body;
                    this.ngbModalRef = this.loanModalRef(component, loan);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const loan = new Loan();
                    this.ngbModalRef = this.loanModalRef(component, loan);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    loanModalRef(component: Component, loan: Loan): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.loan = loan;
        modalRef.result.then(result => {
            this.closeModal(loan);
        },reason => {
            this.closeModal(loan);
        });
        return modalRef;
    }

    closeModal(loan) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
