import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Car } from './car.model';
import { CarService } from './car.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CarPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private carService: CarService

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
                this.carService.find(id).subscribe(carResponse => {
                    const car: Car = carResponse.body;
                    this.ngbModalRef = this.carModalRef(component, car);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const car = new Car();
                    this.ngbModalRef = this.carModalRef(component, car);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carModalRef(component: Component, car: Car): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.car = car;
        modalRef.result.then(result => {
            this.closeModal(car);
        },reason => {
            this.closeModal(car);
        });
        return modalRef;
    }

    closeModal(car) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
