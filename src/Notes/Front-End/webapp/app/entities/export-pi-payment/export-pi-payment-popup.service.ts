import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ExportPiPayment} from './export-pi-payment.model';
import {ExportPiPaymentService} from './export-pi-payment.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class ExportPiPaymentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private exportPiPaymentService: ExportPiPaymentService
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
                this.exportPiPaymentService.find(id).subscribe(exportPiPaymentResponse => {
                    const exportPiPayment: ExportPiPayment = exportPiPaymentResponse.body;
                    this.ngbModalRef = this.exportPiPaymentModalRef(component, exportPiPayment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const exportPiPayment = new ExportPiPayment();
                    exportPiPayment.exportPiId = exportPiId;
                    this.ngbModalRef = this.exportPiPaymentModalRef(component, exportPiPayment);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exportPiPaymentModalRef(component: Component, exportPiPayment: ExportPiPayment): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exportPiPayment = exportPiPayment;
        modalRef.result.then(result => {
            this.closeModal(exportPiPayment);
        }, reason => {
            this.closeModal(exportPiPayment);
        });
        return modalRef;
    }

    closeModal(exportPiPayment) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
