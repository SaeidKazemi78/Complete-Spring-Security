import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CleaningReportOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cleaningReportOilTankService: CleaningReportOilTankService
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
                this.cleaningReportOilTankService.find(id).subscribe(cleaningReportOilTankResponse => {
                    const cleaningReportOilTank: CleaningReportOilTank = cleaningReportOilTankResponse.body;
                    this.ngbModalRef = this.cleaningReportOilTankModalRef(component, cleaningReportOilTank);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const cleaningReportOilTank = new CleaningReportOilTank();
                    this.ngbModalRef = this.cleaningReportOilTankModalRef(component, cleaningReportOilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cleaningReportOilTankModalRef(component: Component, cleaningReportOilTank: CleaningReportOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cleaningReportOilTank = cleaningReportOilTank;
        modalRef.result.then(result => {
            this.closeModal(cleaningReportOilTank);
        },reason => {
            this.closeModal(cleaningReportOilTank);
        });
        return modalRef;
    }

    closeModal(cleaningReportOilTank) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
