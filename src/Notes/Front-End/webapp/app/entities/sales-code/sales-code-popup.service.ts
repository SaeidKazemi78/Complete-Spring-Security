import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SalesCode } from './sales-code.model';
import { SalesCodeService } from './sales-code.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SalesCodePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private salesCodeService: SalesCodeService

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
                this.salesCodeService.find(id)
                    .subscribe((salesCodeResponse: HttpResponse<SalesCode>) => {
                        const salesCode: SalesCode = salesCodeResponse.body;
                        salesCode.receivedDate = this.datePipe
                            .transform(salesCode.receivedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.salesCodeModalRef(component, salesCode);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.salesCodeModalRef(component, new SalesCode());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    salesCodeModalRef(component: Component, salesCode: SalesCode): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.salesCode = salesCode;
        modalRef.result.then(result => {
            this.closeModal(salesCode);
        },reason => {
            this.closeModal(salesCode);
        });
        return modalRef;
    }

    closeModal(salesCode) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
