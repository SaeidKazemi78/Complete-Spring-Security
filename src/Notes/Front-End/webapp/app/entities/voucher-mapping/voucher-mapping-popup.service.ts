import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {VoucherMapping} from './voucher-mapping.model';
import {VoucherMappingService} from './voucher-mapping.service';

@Injectable({ providedIn: 'root' })
export class VoucherMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private voucherMappingService: VoucherMappingService
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
                this.voucherMappingService.find(id).subscribe((voucherMapping) => {
                    this.ngbModalRef = this.voucherMappingModalRef(component, voucherMapping.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const voucherMapping = new VoucherMapping();
                    this.ngbModalRef = this.voucherMappingModalRef(component, voucherMapping);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherMappingModalRef(component: Component, voucherMapping: VoucherMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherMapping = voucherMapping;
        modalRef.result.then((result) => {
            this.closeModal(voucherMapping);
        }, (reason) => {
            this.closeModal(voucherMapping);
        });
        return modalRef;
    }

    closeModal(voucherMapping) {
        this.router.navigate(['voucher-mapping', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
