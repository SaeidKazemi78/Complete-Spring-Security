import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Seal } from './seal.model';
import { SealService } from './seal.service';

@Injectable()
export class SealPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private sealService: SealService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, refuelCenterId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sealService.find(id).subscribe((sealResponse) => {
                    const seal: Seal = sealResponse.body;
                    this.ngbModalRef = this.sealModalRef(component, seal);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const seal = new Seal();
                    seal.refuelCenterId = refuelCenterId;
                    this.ngbModalRef = this.sealModalRef(component, seal);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sealModalRef(component: Component, seal: Seal): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.seal = seal;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
