import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Consumption } from './consumption.model';
import { ConsumptionService } from './consumption.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ConsumptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private consumptionService: ConsumptionService

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
                this.consumptionService.find(id)
                    .subscribe((consumptionResponse: HttpResponse<Consumption>) => {
                        const consumption: Consumption = consumptionResponse.body;
                        this.ngbModalRef = this.consumptionModalRef(component, consumption);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.consumptionModalRef(component, new Consumption());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    consumptionModalRef(component: Component, consumption: Consumption): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.consumption = consumption;
        modalRef.result.then(result => {
            this.closeModal(consumption);
        },reason => {
            this.closeModal(consumption);
        });
        return modalRef;
    }

    closeModal(consumption) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
