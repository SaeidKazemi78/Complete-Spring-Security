import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Depot } from './depot.model';
import { DepotService } from './depot.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class DepotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private depotService: DepotService

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
                this.depotService.find(id)
                    .subscribe((depotResponse: HttpResponse<Depot>) => {
                        const depot: Depot = depotResponse.body;
                        this.ngbModalRef = this.depotModalRef(component, depot);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const depot2 = new Depot();
                    depot2.depotType = 'DEPOT';
                    this.ngbModalRef = this.depotModalRef(component, depot2);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    depotModalRef(component: Component, depot: Depot): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.depot = depot;
        modalRef.result.then(result => {
            this.closeModal(depot);
        },reason => {
            this.closeModal(depot);
        });
        return modalRef;
    }

    closeModal(depot) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
