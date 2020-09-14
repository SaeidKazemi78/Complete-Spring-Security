import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Bank } from './bank.model';
import { BankService } from './bank.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private bankService: BankService

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
                this.bankService.find(id).subscribe(bankResponse => {
                    const bank: Bank = bankResponse.body;
                    this.ngbModalRef = this.bankModalRef(component, bank);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const bank = new Bank();
                    this.ngbModalRef = this.bankModalRef(component, bank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bankModalRef(component: Component, bank: Bank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bank = bank;
        modalRef.result.then(result => {
            this.closeModal(bank);
        },reason => {
            this.closeModal(bank);
        });
        return modalRef;
    }

    closeModal(bank) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
