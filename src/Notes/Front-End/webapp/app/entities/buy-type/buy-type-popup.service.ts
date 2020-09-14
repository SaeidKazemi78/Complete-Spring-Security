import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BuyType } from './buy-type.model';
import { BuyTypeService } from './buy-type.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BuyTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private buyTypeService: BuyTypeService

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
                this.buyTypeService.find(id)
                    .subscribe((buyTypeResponse: HttpResponse<BuyType>) => {
                        const buyType: BuyType = buyTypeResponse.body;
                        this.ngbModalRef = this.buyTypeModalRef(component, buyType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.buyTypeModalRef(component, new BuyType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    buyTypeModalRef(component: Component, buyType: BuyType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.buyType = buyType;
        modalRef.result.then(result => {
            this.closeModal(buyType);
        },reason => {
            this.closeModal(buyType);
        });
        return modalRef;
    }

    closeModal(buyType) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
