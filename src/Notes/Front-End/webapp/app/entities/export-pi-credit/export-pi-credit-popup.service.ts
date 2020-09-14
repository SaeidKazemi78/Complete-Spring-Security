import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {getPath} from 'app/core/router';
import {CustomerCredit, CustomerCreditService} from 'app/entities/customer-credit';

@Injectable({providedIn: 'root'})
export class ExportPiCreditPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerCreditService: CustomerCreditService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, exportPiId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerCreditService.find(id).subscribe(exportPiPaymentResponse => {
                    const customerCredit: CustomerCredit = exportPiPaymentResponse.body;
                    this.ngbModalRef = this.exportPiCreditModalRef(component, customerCredit);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerCredit = new CustomerCredit();
                    customerCredit.exportPiId = exportPiId;
                    this.ngbModalRef = this.exportPiCreditModalRef(component, customerCredit);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exportPiCreditModalRef(component: Component, customerCredit: CustomerCredit): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerCredit = customerCredit;
        modalRef.result.then(result => {
            this.closeModal(customerCredit);
        }, reason => {
            this.closeModal(customerCredit);
        });
        return modalRef;
    }

    closeModal(exportPiPayment) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
