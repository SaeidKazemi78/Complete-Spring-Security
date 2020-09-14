import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Manufacture } from './manufacture.model';
import { ManufactureService } from './manufacture.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ManufacturePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private manufactureService: ManufactureService

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
                this.manufactureService.find(id)
                    .subscribe((manufactureResponse: HttpResponse<Manufacture>) => {
                        const manufacture: Manufacture = manufactureResponse.body;
                        this.ngbModalRef = this.manufactureModalRef(component, manufacture);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.manufactureModalRef(component, new Manufacture());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    manufactureModalRef(component: Component, manufacture: Manufacture): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.manufacture = manufacture;
        modalRef.result.then(result => {
            this.closeModal(manufacture);
        },reason => {
            this.closeModal(manufacture);
        });
        return modalRef;
    }

    closeModal(manufacture) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
