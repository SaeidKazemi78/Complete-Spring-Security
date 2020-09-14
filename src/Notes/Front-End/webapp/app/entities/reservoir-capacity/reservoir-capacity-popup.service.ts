import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ReservoirCapacity } from './reservoir-capacity.model';
import { ReservoirCapacityService } from './reservoir-capacity.service';

@Injectable({ providedIn: 'root' })
export class ReservoirCapacityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private reservoirCapacityService: ReservoirCapacityService

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
                this.reservoirCapacityService.find(id)
                    .subscribe((reservoirCapacityResponse: HttpResponse<ReservoirCapacity>) => {
                        const reservoirCapacity: ReservoirCapacity = reservoirCapacityResponse.body;
                        this.ngbModalRef = this.reservoirCapacityModalRef(component, reservoirCapacity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reservoirCapacityModalRef(component, new ReservoirCapacity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reservoirCapacityModalRef(component: Component, reservoirCapacity: ReservoirCapacity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reservoirCapacity = reservoirCapacity;
        modalRef.result.then(result => {
            this.closeModal(reservoirCapacity);
        },reason => {
            this.closeModal(reservoirCapacity);
        });
        return modalRef;
    }

    closeModal(reservoirCapacity) {
        this.router.navigate(['reservoir-capacity', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
