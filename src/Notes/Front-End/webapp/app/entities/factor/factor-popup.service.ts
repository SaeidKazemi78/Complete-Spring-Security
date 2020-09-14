import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Factor } from './factor.model';
import { FactorService } from './factor.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class FactorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private factorService: FactorService

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
                this.factorService.find(id).subscribe(factor => {
                    this.ngbModalRef = this.factorModalRef(component, factor.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const factor = new Factor();
                    this.ngbModalRef = this.factorModalRef(component, factor);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    factorModalRef(component: Component, factor: Factor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.factor = factor;
        modalRef.result.then(result => {
            this.closeModal(factor);
        },reason => {
            this.closeModal(factor);
        });
        return modalRef;
    }

    closeModal(factor) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
