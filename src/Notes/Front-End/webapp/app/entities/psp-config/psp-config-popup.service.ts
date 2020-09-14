import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PspConfig } from './psp-config.model';
import { PspConfigService } from './psp-config.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PspConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private pspConfigService: PspConfigService

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
                this.pspConfigService.find(id).subscribe(pspConfigResponse => {
                    const pspConfig: PspConfig = pspConfigResponse.body;
                    this.ngbModalRef = this.pspConfigModalRef(component, pspConfig);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const pspConfig = new PspConfig();
                    this.ngbModalRef = this.pspConfigModalRef(component, pspConfig);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pspConfigModalRef(component: Component, pspConfig: PspConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pspConfig = pspConfig;
        modalRef.result.then(result => {
            this.closeModal(pspConfig);
        },reason => {
            this.closeModal(pspConfig);
        });
        return modalRef;
    }

    closeModal(pspConfig) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
