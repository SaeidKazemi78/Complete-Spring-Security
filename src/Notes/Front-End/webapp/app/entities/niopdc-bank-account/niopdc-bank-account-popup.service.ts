import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NiopdcBankAccount } from './niopdc-bank-account.model';
import { NiopdcBankAccountService } from './niopdc-bank-account.service';

@Injectable({ providedIn: 'root' })
export class NiopdcBankAccountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private niopdcBankAccountService: NiopdcBankAccountService

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
                this.niopdcBankAccountService.find(id).subscribe(niopdcBankAccountResponse => {
                    const niopdcBankAccount: NiopdcBankAccount = niopdcBankAccountResponse.body;
                    this.ngbModalRef = this.niopdcBankAccountModalRef(component, niopdcBankAccount);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const niopdcBankAccount = new NiopdcBankAccount();
                    this.ngbModalRef = this.niopdcBankAccountModalRef(component, niopdcBankAccount);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    niopdcBankAccountModalRef(component: Component, niopdcBankAccount: NiopdcBankAccount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.niopdcBankAccount = niopdcBankAccount;
        modalRef.result.then(result => {
            this.closeModal(niopdcBankAccount);
        },reason => {
            this.closeModal(niopdcBankAccount);
        });
        return modalRef;
    }

    closeModal(niopdcBankAccount) {
        this.router.navigate(['niopdc-bank-account', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
