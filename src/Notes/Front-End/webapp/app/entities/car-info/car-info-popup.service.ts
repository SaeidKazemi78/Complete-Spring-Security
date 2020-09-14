import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CarInfo } from './car-info.model';
import { CarInfoService } from './car-info.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CarInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private carInfoService: CarInfoService

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
                this.carInfoService.find(id).subscribe(carInfoResponse => {
                    const carInfo: CarInfo = carInfoResponse.body;
                    this.ngbModalRef = this.carInfoModalRef(component, carInfo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carInfo = new CarInfo();
                    carInfo.carId = carId;
                    this.ngbModalRef = this.carInfoModalRef(component, carInfo);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carInfoModalRef(component: Component, carInfo: CarInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carInfo = carInfo;
        modalRef.result.then(result => {
            this.closeModal(carInfo);
        },reason => {
            this.closeModal(carInfo);
        });
        return modalRef;
    }

    closeModal(carInfo) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
