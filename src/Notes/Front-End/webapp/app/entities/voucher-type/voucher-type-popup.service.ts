import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {VoucherType} from './voucher-type.model';
import {VoucherTypeService} from './voucher-type.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class VoucherTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private voucherTypeService: VoucherTypeService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, voucherTypeGroupId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.voucherTypeService.find(id)
                    .subscribe((voucherTypeResponse: HttpResponse<VoucherType>) => {
                        const voucherType: VoucherType = voucherTypeResponse.body;
                        this.ngbModalRef = this.voucherTypeModalRef(component, voucherType);
                        resolve(this.ngbModalRef);
                    });
            } else if (voucherTypeGroupId) {
                const voucherType = new VoucherType();
                voucherType.voucherTypeGroupId = voucherTypeGroupId;
                this.ngbModalRef = this.voucherTypeModalRef(component, voucherType);
                resolve(this.ngbModalRef);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.voucherTypeModalRef(component, new VoucherType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherTypeModalRef(component: Component, voucherType: VoucherType): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherType = voucherType;
        modalRef.result.then((result) => {
            this.closeModal(voucherType);
        }, (reason) => {
            this.closeModal(voucherType);
        });
        return modalRef;
    }

    closeModal(voucherType) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {
            replaceUrl: true,
            queryParamsHandling: 'merge'
        });
        this.ngbModalRef = null;
    }

}
