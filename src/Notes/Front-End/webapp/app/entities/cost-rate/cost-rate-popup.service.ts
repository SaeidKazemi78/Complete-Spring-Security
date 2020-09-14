import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CostRate } from './cost-rate.model';
import { CostRateService } from './cost-rate.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CostRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private costRateService: CostRateService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, costId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costRateService.find(id).subscribe(costRate => {
                    this.ngbModalRef = this.costRateModalRef(component, costRate.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const costRate = new CostRate();
                    costRate.costId = costId;
                    this.ngbModalRef = this.costRateModalRef(component, costRate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costRateModalRef(component: Component, costRate: CostRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.costRate = costRate;
        modalRef.result.then(result => {
            this.closeModal(costRate);
        },reason => {
            this.closeModal(costRate);
        });
        return modalRef;
    }

    closeModal(costRate) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
