import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from './vehicle-model.model';
import { VehicleModelService } from './vehicle-model.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class VehicleModelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private vehicleModelService: VehicleModelService

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
                this.vehicleModelService.find(id).subscribe(vehicleModel => {
                    this.ngbModalRef = this.vehicleModelModalRef(component, vehicleModel.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const vehicleModel = new VehicleModel();
                    this.ngbModalRef = this.vehicleModelModalRef(component, vehicleModel);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleModelModalRef(component: Component, vehicleModel: VehicleModel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicleModel = vehicleModel;
        modalRef.result.then(result => {
            this.closeModal(vehicleModel);
        },reason => {
            this.closeModal(vehicleModel);
        });
        return modalRef;
    }

    closeModal(vehicleModel) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
