import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CeilingQuota } from './ceiling-quota.model';
import { CeilingQuotaService } from './ceiling-quota.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CeilingQuotaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ceilingQuotaService: CeilingQuotaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, customerId, id?: number | any, customerCreditId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.ceilingQuotaService.find(id).subscribe(ceilingQuota => {
                    this.ngbModalRef = this.ceilingQuotaModalRef(component, customerId, ceilingQuota.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const ceilingQuota = new CeilingQuota();
                    ceilingQuota.customerCreditId = customerCreditId;
                    this.ngbModalRef = this.ceilingQuotaModalRef(component, customerId, ceilingQuota);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ceilingQuotaModalRef(component: Component, customerId, ceilingQuota: CeilingQuota): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ceilingQuota = ceilingQuota;
        modalRef.result.then(result => {
            this.closeModal(customerId, ceilingQuota);
        }, reason => {
            this.closeModal(customerId, ceilingQuota);
        });
        return modalRef;
    }

    closeModal(customerId, ceilingQuota) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
