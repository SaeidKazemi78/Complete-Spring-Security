import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VoucherItem } from './voucher-item.model';
import { VoucherItemService } from './voucher-item.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class VoucherItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private voucherItemService: VoucherItemService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, voucherMasterId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.voucherItemService.find(id).subscribe((voucherItemResponse) => {
                    const voucherItem: VoucherItem = voucherItemResponse.body;
                    this.ngbModalRef = this.voucherItemModalRef(component, voucherItem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const voucherItem = new VoucherItem();
                    voucherItem.voucherMasterId = voucherMasterId;
                    this.ngbModalRef = this.voucherItemModalRef(component, voucherItem);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherItemModalRef(component: Component, voucherItem: VoucherItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherItem = voucherItem;
        modalRef.result.then((result) => {
            this.closeModal(voucherItem);
        }, (reason) => {
            this.closeModal(voucherItem);
        });
        return modalRef;
    }

    closeModal(voucherItem) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
