import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FactorItem } from './factor-item.model';
import { FactorItemService } from './factor-item.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class FactorItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private factorItemService: FactorItemService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, factorId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.factorItemService.find(id).subscribe(factorItem => {
                    this.ngbModalRef = this.factorItemModalRef(component, factorItem.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const factorItem = new FactorItem();
                    factorItem.factorId = factorId;
                    this.ngbModalRef = this.factorItemModalRef(component, factorItem);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    factorItemModalRef(component: Component, factorItem: FactorItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.factorItem = factorItem;
        modalRef.result.then(result => {
            this.closeModal(factorItem);
        },reason => {
            this.closeModal(factorItem);
        });
        return modalRef;
    }

    closeModal(factorItem) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
