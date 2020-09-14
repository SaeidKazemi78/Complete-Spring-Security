import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerStationInfo } from './customer-station-info.model';
import { CustomerStationInfoService } from './customer-station-info.service';

@Injectable({ providedIn: 'root' })
export class CustomerStationInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private customerStationInfoService: CustomerStationInfoService

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
                this.customerStationInfoService.find(id).subscribe(customerStationInfoResponse => {
                    let customerStationInfo: CustomerStationInfo = customerStationInfoResponse.body;
                    if (!customerStationInfo.id) {
                    customerStationInfo = new CustomerStationInfo();
                    customerStationInfo.customerId = id;
                    }
                    this.ngbModalRef = this.customerStationInfoModalRef(component, customerStationInfo);
                    resolve(this.ngbModalRef);
                });
            }
        });
    }

    customerStationInfoModalRef(component: Component, customerStationInfo: CustomerStationInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerStationInfo = customerStationInfo;
        modalRef.result.then(result => {
            this.closeModal(customerStationInfo);
        },reason => {
            this.closeModal(customerStationInfo);
        });
        return modalRef;
    }

    closeModal(customerStationInfo) {
        this.router.navigate(['customer', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
