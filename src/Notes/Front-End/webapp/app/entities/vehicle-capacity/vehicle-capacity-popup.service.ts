import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VehicleCapacity } from './vehicle-capacity.model';
import { VehicleCapacityService } from './vehicle-capacity.service';

@Injectable({ providedIn: 'root' })
export class VehicleCapacityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private vehicleCapacityService: VehicleCapacityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, vehicleModelId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.vehicleCapacityService.find(id).subscribe(vehicleCapacity => {
                    this.ngbModalRef = this.vehicleCapacityModalRef(component, vehicleCapacity.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const vehicleCapacity = new VehicleCapacity();
                    vehicleCapacity.vehicleModelId = vehicleModelId;
                    this.ngbModalRef = this.vehicleCapacityModalRef(component, vehicleCapacity);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleCapacityModalRef(component: Component, vehicleCapacity: VehicleCapacity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicleCapacity = vehicleCapacity;
        modalRef.result.then(result => {
            this.closeModal(vehicleCapacity);
        },reason => {
            this.closeModal(vehicleCapacity);
        });
        return modalRef;
    }

    closeModal(vehicleCapacity) {
        this.router.navigate(['vehicle-model', vehicleCapacity.vehicleModelId, 'vehicle-capacity', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
