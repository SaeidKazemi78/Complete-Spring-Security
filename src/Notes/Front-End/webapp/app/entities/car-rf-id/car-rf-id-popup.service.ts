import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarRfId } from './car-rf-id.model';
import { CarRfIdService } from './car-rf-id.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CarRfIdPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private carRfIdService: CarRfIdService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerId?: number | any, locationId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.carRfIdService.find(id).subscribe(carRfId => {
                    this.ngbModalRef = this.carRfIdModalRef(component, carRfId.body);
                    resolve(this.ngbModalRef);
                });
            } else if(customerId){
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carRfId = new CarRfId();
                    carRfId.customerId = customerId;
                    this.ngbModalRef = this.carRfIdModalRef(component, carRfId);
                    resolve(this.ngbModalRef);
                }, 0);
            }else if (locationId){
                setTimeout(() => {
                    const carRfId = new CarRfId();
                    carRfId.locationId = locationId;
                    this.ngbModalRef = this.carRfIdModalRef(component, carRfId);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carRfIdModalRef(component: Component, carRfId: CarRfId): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carRfId = carRfId;
        modalRef.result.then(result => {
            this.closeModal(carRfId);
        },reason => {
            this.closeModal(carRfId);
        });
        return modalRef;
    }

    closeModal(carRfId) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
