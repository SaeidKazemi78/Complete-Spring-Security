import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VoucherMaster } from './voucher-master.model';
import { VoucherMasterService } from './voucher-master.service';

@Injectable({ providedIn: 'root' })
export class VoucherMasterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private voucherMasterService: VoucherMasterService

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
                this.voucherMasterService.find(id)
                    .subscribe((voucherMasterResponse: HttpResponse<VoucherMaster>) => {
                        const voucherMaster: VoucherMaster = voucherMasterResponse.body;
                        this.ngbModalRef = this.voucherMasterModalRef(component, voucherMaster);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.voucherMasterModalRef(component, new VoucherMaster());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherMasterModalRef(component: Component, voucherMaster: VoucherMaster): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherMaster = voucherMaster;
        modalRef.result.then((result) => {
            this.closeModal(voucherMaster);
        }, (reason) => {
            this.closeModal(voucherMaster);
        });
        return modalRef;
    }

    closeModal(voucherMaster) {
        this.router.navigate(['voucher-master', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
