import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VoucherTemplate } from './voucher-template.model';
import { VoucherTemplateService } from './voucher-template.service';

@Injectable({ providedIn: 'root' })
export class VoucherTemplatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private voucherTemplateService: VoucherTemplateService

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
                this.voucherTemplateService.find(id).subscribe((voucherTemplate) => {
                    this.ngbModalRef = this.voucherTemplateModalRef(component, voucherTemplate.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const voucherTemplate = new VoucherTemplate();
                    this.ngbModalRef = this.voucherTemplateModalRef(component, voucherTemplate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voucherTemplateModalRef(component: Component, voucherTemplate: VoucherTemplate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voucherTemplate = voucherTemplate;
        modalRef.result.then((result) => {
            this.closeModal(voucherTemplate);
        }, (reason) => {
            this.closeModal(voucherTemplate);
        });
        return modalRef;
    }

    closeModal(voucherTemplate) {
        this.router.navigate(['voucher-template', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
