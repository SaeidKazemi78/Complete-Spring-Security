import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CustomerTypeProductConsumption } from './customer-type-product-consumption.model';
import { CustomerTypeProductConsumptionService } from './customer-type-product-consumption.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CustomerTypeProductConsumptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private customerTypeProductConsumptionService: CustomerTypeProductConsumptionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, productId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerTypeProductConsumptionService.find(id)
                    .subscribe((customerTypeProductConsumptionResponse: HttpResponse<CustomerTypeProductConsumption>) => {
                        const customerTypeProductConsumption: CustomerTypeProductConsumption = customerTypeProductConsumptionResponse.body;
                        this.ngbModalRef = this.customerTypeProductConsumptionModalRef(component, customerTypeProductConsumption);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerTypeProductConsumption = new CustomerTypeProductConsumption();
                    customerTypeProductConsumption.productId = productId;
                    this.ngbModalRef = this.customerTypeProductConsumptionModalRef(component, customerTypeProductConsumption);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerTypeProductConsumptionModalRef(component: Component, customerTypeProductConsumption: CustomerTypeProductConsumption): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerTypeProductConsumption = customerTypeProductConsumption;
        modalRef.result.then(result => {
            this.closeModal(customerTypeProductConsumption);
        }, reason => {
            this.closeModal(customerTypeProductConsumption);
        });
        return modalRef;
    }

    closeModal(customerTypeProductConsumption) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
