import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Bill } from './bill.model';
import { BillService } from './bill.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BillPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private billService: BillService

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
                this.billService.find(id).subscribe(bill => {
                    this.ngbModalRef = this.billModalRef(component, bill.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const bill = new Bill();
                    this.ngbModalRef = this.billModalRef(component, bill);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billModalRef(component: Component, bill: Bill): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bill = bill;
        modalRef.result.then(result => {
            this.closeModal(bill);
        },reason => {
            this.closeModal(bill);
        });
        return modalRef;
    }

    closeModal(bill) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
