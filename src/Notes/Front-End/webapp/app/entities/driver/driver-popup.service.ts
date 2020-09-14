import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Driver } from './driver.model';
import { DriverService } from './driver.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class DriverPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private driverService: DriverService

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
                this.driverService.find(id).subscribe(driverResponse => {
                    const driver: Driver = driverResponse.body;
                    this.ngbModalRef = this.driverModalRef(component, driver);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const driver = new Driver();
                    driver.carId = carId;
                    this.ngbModalRef = this.driverModalRef(component, driver);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    driverModalRef(component: Component, driver: Driver): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.driver = driver;
        modalRef.result.then(result => {
            this.closeModal(driver);
        },reason => {
            this.closeModal(driver);
        });
        return modalRef;
    }

    closeModal(driver) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
