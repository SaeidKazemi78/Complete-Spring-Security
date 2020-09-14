import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Infringement } from './infringement.model';
import { InfringementService } from './infringement.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class InfringementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private infringementService: InfringementService

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
                this.infringementService.find(id).subscribe(infringement => {
                    this.ngbModalRef = this.newsModalRef(component, infringement.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const infringement = new Infringement();
                    infringement.customerId = customerId;
                    this.ngbModalRef = this.newsModalRef(component, infringement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    newsModalRef(component: Component, infringement: Infringement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.infringement = infringement;
        modalRef.result.then(result => {
            this.closeModal(infringement);
        },reason => {
            this.closeModal(infringement);
        });
        return modalRef;
    }

    closeModal(infringement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
