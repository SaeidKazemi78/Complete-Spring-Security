import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SellContract } from './sell-contract.model';
import { SellContractService } from './sell-contract.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SellContractPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sellContractService: SellContractService

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
                this.sellContractService.find(id)
                    .subscribe((sellContractResponse: HttpResponse<SellContract>) => {
                        const sellContract: SellContract = sellContractResponse.body;
                        sellContract.finishDateServer = sellContract.finishDate;
                        this.ngbModalRef = this.sellContractModalRef(component, sellContract);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sellContractModalRef(component, new SellContract());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sellContractModalRef(component: Component, sellContract: SellContract): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sellContract = sellContract;
        modalRef.result.then(result => {
            this.closeModal(sellContract);
        },reason => {
            this.closeModal(sellContract);
        });
        return modalRef;
    }

    closeModal(sellContract) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
