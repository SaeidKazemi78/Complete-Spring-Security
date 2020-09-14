import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerCapacity } from './customer-capacity.model';
import { CustomerCapacityService } from './customer-capacity.service';

@Injectable({ providedIn: 'root' })
export class CustomerCapacityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private customerCapacityService: CustomerCapacityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerCapacityService.find(id).subscribe(customerCapacityResponse => {
                    const customerCapacity: CustomerCapacity = customerCapacityResponse.body;
                    this.ngbModalRef = this.customerCapacityModalRef(component, customerCapacity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerCapacity = new CustomerCapacity();
                    customerCapacity.customerId = customerId;
                    this.ngbModalRef = this.customerCapacityModalRef(component, customerCapacity);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerCapacityModalRef(component: Component, customerCapacity: CustomerCapacity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerCapacity = customerCapacity;
        modalRef.result.then(result => {
            this.closeModal(customerCapacity);
        }, reason => {
            this.closeModal(customerCapacity);
        });
        return modalRef;
    }

    closeModal(customerCapacity) {
        this.router.navigate([customerCapacity.customerId ?  ('customer/' + customerCapacity.customerId + '/customer-capacity') : ('customer-capacity') , { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
