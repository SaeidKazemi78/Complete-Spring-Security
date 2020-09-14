import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccountNumberFormat } from './account-number-format.model';
import { AccountNumberFormatService } from './account-number-format.service';

@Injectable({ providedIn: 'root' })
export class AccountNumberFormatPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private accountNumberFormatService: AccountNumberFormatService

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
                this.accountNumberFormatService.find(id).subscribe(accountNumberFormatResponse => {
                    const accountNumberFormat: AccountNumberFormat = accountNumberFormatResponse.body;
                    this.ngbModalRef = this.accountNumberFormatModalRef(component, accountNumberFormat);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const accountNumberFormat = new AccountNumberFormat();
                    this.ngbModalRef = this.accountNumberFormatModalRef(component, accountNumberFormat);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountNumberFormatModalRef(component: Component, accountNumberFormat: AccountNumberFormat): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accountNumberFormat = accountNumberFormat;
        modalRef.result.then(result => {
            this.closeModal(accountNumberFormat);
        },reason => {
            this.closeModal(accountNumberFormat);
        });
        return modalRef;
    }

    closeModal(accountNumberFormat) {
        this.router.navigate(['account-number-format', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
