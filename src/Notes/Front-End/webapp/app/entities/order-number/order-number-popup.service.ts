import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderNumber } from './order-number.model';
import { OrderNumberService } from './order-number.service';
import {getPath} from "app/core/router";

@Injectable({ providedIn: 'root' })
export class OrderNumberPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private orderNumberService: OrderNumberService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, locationId?: number | any, refuelCenterId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.orderNumberService.find(id).subscribe(orderNumberResponse => {
                    const orderNumber: OrderNumber = orderNumberResponse.body;
                    this.ngbModalRef = this.orderNumberModalRef(component, orderNumber);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const orderNumber = new OrderNumber();
                    orderNumber.locationId = locationId;
                    orderNumber.refuelCenterId = refuelCenterId;
                    this.ngbModalRef = this.orderNumberModalRef(component, orderNumber);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderNumberModalRef(component: Component, orderNumber: OrderNumber): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.orderNumber = orderNumber;
        modalRef.result.then(result => {
            this.closeModal(orderNumber);
        },reason => {
            this.closeModal(orderNumber);
        });
        return modalRef;
    }

    closeModal(orderNumber) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
