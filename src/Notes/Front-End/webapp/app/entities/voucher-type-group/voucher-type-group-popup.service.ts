import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VoucherTypeGroup } from './voucher-type-group.model';
import { VoucherTypeGroupService } from './voucher-type-group.service';

@Injectable({ providedIn: 'root' })
export class VoucherTypeGroupPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private voucherTypeGroupService: VoucherTypeGroupService

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
                this.voucherTypeGroupService.find(id).subscribe((voucherTypeGroup) => {
                    this.ngbModalRef = this.voucherTypeGroupModalRef(component, voucherTypeGroup.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const voucherTypeGroup = new VoucherTypeGroup();
                    this.ngbModalRef = this.voucherTypeGroupModalRef(component, voucherTypeGroup);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherTypeGroupModalRef(component: Component, voucherTypeGroup: VoucherTypeGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherTypeGroup = voucherTypeGroup;
        modalRef.result.then((result) => {
            this.router.navigate(['voucher-type-group',{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['voucher-type-group',{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

    closeModal(voucherTypeGroup) {
        this.router.navigate(['voucher-type-group',{ outlets: { popup: null }}], { replaceUrl: true });
        this.ngbModalRef = null;
    }

}
