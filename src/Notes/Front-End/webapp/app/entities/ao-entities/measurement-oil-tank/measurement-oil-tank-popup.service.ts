import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {MeasurementOilTank} from './measurement-oil-tank.model';
import {MeasurementOilTankService} from './measurement-oil-tank.service';

@Injectable({ providedIn: 'root' })
export class MeasurementOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private measurementOilTankService: MeasurementOilTankService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.measurementOilTankService.find(id).subscribe(measurementOilTank => {
                    this.ngbModalRef = this.measurementOilTankModalRef(component, measurementOilTank.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const measurementOilTank = new MeasurementOilTank();
                    this.ngbModalRef = this.measurementOilTankModalRef(component, measurementOilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    measurementOilTankModalRef(component: Component, measurementOilTank: MeasurementOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.measurementOilTank = measurementOilTank;
        modalRef.result.then(result => {
            this.closeModal(measurementOilTank);
        },reason => {
            this.closeModal(measurementOilTank);
        });
        return modalRef;
    }

    closeModal(measurementOilTank) {
        this.router.navigate(['measurement-oil-tank', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
