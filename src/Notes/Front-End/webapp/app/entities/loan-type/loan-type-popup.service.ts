import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LoanType } from './loan-type.model';
import { LoanTypeService } from './loan-type.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LoanTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private loanTypeService: LoanTypeService

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
                this.loanTypeService.find(id).subscribe(loanTypeResponse => {
                    const loanType: LoanType = loanTypeResponse.body;
                    this.ngbModalRef = this.loanTypeModalRef(component, loanType);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const loanType = new LoanType();
                    this.ngbModalRef = this.loanTypeModalRef(component, loanType);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    loanTypeModalRef(component: Component, loanType: LoanType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.loanType = loanType;
        modalRef.result.then(result => {
            this.closeModal(loanType);
        },reason => {
            this.closeModal(loanType);
        });
        return modalRef;
    }

    closeModal(loanType) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
