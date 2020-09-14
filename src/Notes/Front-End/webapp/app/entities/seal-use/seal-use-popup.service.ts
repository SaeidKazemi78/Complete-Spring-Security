import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SealUse } from './seal-use.model';
import { SealUseService } from './seal-use.service';

@Injectable({ providedIn: 'root' })
export class SealUsePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sealUseService: SealUseService

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
                this.sealUseService.find(id)
                    .subscribe((sealUseResponse: HttpResponse<SealUse>) => {
                        const sealUse: SealUse = sealUseResponse.body;
                        this.ngbModalRef = this.sealUseModalRef(component, sealUse);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sealUseModalRef(component, new SealUse());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sealUseModalRef(component: Component, sealUse: SealUse): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sealUse = sealUse;
        modalRef.result.then(result => {
            this.closeModal(sealUse);
        },reason => {
            this.closeModal(sealUse);
        });
        return modalRef;
    }

    closeModal(sealUse) {
        this.router.navigate(['seal-use', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
