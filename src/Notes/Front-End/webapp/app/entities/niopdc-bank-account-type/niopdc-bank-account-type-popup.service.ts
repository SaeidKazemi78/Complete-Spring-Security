import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NiopdcBankAccountType } from './niopdc-bank-account-type.model';
import { NiopdcBankAccountTypeService } from './niopdc-bank-account-type.service';

@Injectable({ providedIn: 'root' })
export class NiopdcBankAccountTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private niopdcBankAccountTypeService: NiopdcBankAccountTypeService

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
                this.niopdcBankAccountTypeService.find(id).subscribe(niopdcBankAccountTypeResponse => {
                    const niopdcBankAccountType: NiopdcBankAccountType = niopdcBankAccountTypeResponse.body;
                    this.ngbModalRef = this.niopdcBankAccountTypeModalRef(component, niopdcBankAccountType);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const niopdcBankAccountType = new NiopdcBankAccountType();
                    this.ngbModalRef = this.niopdcBankAccountTypeModalRef(component, niopdcBankAccountType);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    niopdcBankAccountTypeModalRef(component: Component, niopdcBankAccountType: NiopdcBankAccountType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.niopdcBankAccountType = niopdcBankAccountType;
        modalRef.result.then(result => {
            this.closeModal(niopdcBankAccountType);
        },reason => {
            this.closeModal(niopdcBankAccountType);
        });
        return modalRef;
    }

    closeModal(niopdcBankAccountType) {
        this.router.navigate(['niopdc-bank-account-type', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
