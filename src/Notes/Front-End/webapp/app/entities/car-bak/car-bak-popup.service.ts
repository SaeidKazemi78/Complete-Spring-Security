import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarBak } from './car-bak.model';
import { CarBakService } from './car-bak.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CarBakPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private carBakService: CarBakService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, carId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.carBakService.find(id).subscribe(carBakResponse => {
                    const carBak: CarBak = carBakResponse.body;
                    this.ngbModalRef = this.carBakModalRef(component, carBak);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carBak = new CarBak();
                    carBak.carId = carId;
                    this.ngbModalRef = this.carBakModalRef(component, carBak);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carBakModalRef(component: Component, carBak: CarBak): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carBak = carBak;
        modalRef.result.then(result => {
            this.closeModal(carBak);
        },reason => {
            this.closeModal(carBak);
        });
        return modalRef;
    }

    closeModal(carBak) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
