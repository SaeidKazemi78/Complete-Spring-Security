import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerVisit } from './customer-visit.model';
import { CustomerVisitService } from './customer-visit.service';
import {getPath} from '../../core/router';

@Injectable({ providedIn: 'root' })
export class CustomerVisitPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private customerVisitService: CustomerVisitService

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
                this.customerVisitService.find(id).subscribe((customerVisitResponse) => {
                    const customerVisit: CustomerVisit = customerVisitResponse.body;
                    this.ngbModalRef = this.customerVisitModalRef(component, customerVisit);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerVisit = new CustomerVisit();
                    customerVisit.customerId = customerId;
                    this.ngbModalRef = this.customerVisitModalRef(component, customerVisit);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerVisitModalRef(component: Component, customerVisit: CustomerVisit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerVisit = customerVisit;
        modalRef.result.then((result) => {
            this.closeModal(customerVisit);
        }, (reason) => {
            this.closeModal(customerVisit);

        });
        return modalRef;
    }

    closeModal(customerVisit) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
