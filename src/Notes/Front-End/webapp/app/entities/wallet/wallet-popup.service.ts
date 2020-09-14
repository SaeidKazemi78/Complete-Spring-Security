import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Wallet } from './wallet.model';
import { WalletService } from './wallet.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class WalletPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private walletService: WalletService

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
                this.walletService.find(id)
                    .subscribe((walletResponse: HttpResponse<Wallet>) => {
                        const wallet: Wallet = walletResponse.body;
                        this.ngbModalRef = this.walletModalRef(component, wallet);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.walletModalRef(component, new Wallet());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    walletModalRef(component: Component, wallet: Wallet): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wallet = wallet;
        modalRef.result.then((result) => {
            this.closeModal(wallet);
        }, (reason) => {
            this.closeModal(wallet);
        });
        return modalRef;
    }

    closeModal(wallet) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
