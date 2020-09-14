import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccountNumberItems } from './account-number-items.model';
import { AccountNumberItemsService } from './account-number-items.service';

@Injectable({ providedIn: 'root' })
export class AccountNumberItemsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private accountNumberItemsService: AccountNumberItemsService

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
                this.accountNumberItemsService.find(id).subscribe(accountNumberItemsResponse => {
                    const accountNumberItems: AccountNumberItems = accountNumberItemsResponse.body;
                    this.ngbModalRef = this.accountNumberItemsModalRef(component, accountNumberItems);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const accountNumberItems = new AccountNumberItems();
                    this.ngbModalRef = this.accountNumberItemsModalRef(component, accountNumberItems);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountNumberItemsModalRef(component: Component, accountNumberItems: AccountNumberItems): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accountNumberItems = accountNumberItems;
        modalRef.result.then(result => {
            this.closeModal(accountNumberItems);
        },reason => {
            this.closeModal(accountNumberItems);
        });
        return modalRef;
    }

    closeModal(accountNumberItems) {
        this.router.navigate(['account-number-items', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
