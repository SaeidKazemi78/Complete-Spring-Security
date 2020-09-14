import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TransferType } from './transfer-type.model';
import { TransferTypeService } from './transfer-type.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TransferTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private transferTypeService: TransferTypeService

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
                this.transferTypeService.find(id)
                    .subscribe((transferTypeResponse: HttpResponse<TransferType>) => {
                        const transferType: TransferType = transferTypeResponse.body;
                        this.ngbModalRef = this.transferTypeModalRef(component, transferType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transferTypeModalRef(component, new TransferType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transferTypeModalRef(component: Component, transferType: TransferType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transferType = transferType;
        modalRef.result.then(result => {
            this.closeModal(transferType);
        },reason => {
            this.closeModal(transferType);
        });
        return modalRef;
    }

    closeModal(transferType) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
