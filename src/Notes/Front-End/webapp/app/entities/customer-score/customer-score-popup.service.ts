import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CustomerScore } from './customer-score.model';
import { CustomerScoreService } from './customer-score.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CustomerScorePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private customerScoreService: CustomerScoreService

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
                this.customerScoreService.find(id).subscribe(customerScore => {
                    this.ngbModalRef = this.customerScoreModalRef(component, customerScore.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerScore = new CustomerScore();
                    customerScore.customerId = customerId;
                    this.ngbModalRef = this.customerScoreModalRef(component, customerScore);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerScoreModalRef(component: Component, customerScore: CustomerScore): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerScore = customerScore;
        modalRef.result.then(result => {
            this.closeModal(customerScore);
        },reason => {
            this.closeModal(customerScore);
        });
        return modalRef;
    }

    closeModal(customerScore) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
