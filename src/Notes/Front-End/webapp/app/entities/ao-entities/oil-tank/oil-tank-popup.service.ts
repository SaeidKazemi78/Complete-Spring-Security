import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {OilTank, OilTankStatus} from './oil-tank.model';
import {OilTankService} from './oil-tank.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class OilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private oilTankService: OilTankService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.oilTankService.find(id).subscribe(oilTank => {
                    this.ngbModalRef = this.oilTankModalRef(component, oilTank.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const oilTank = new OilTank();
                    oilTank.oilTankStatus = OilTankStatus[OilTankStatus.ACTIVE];
                    this.ngbModalRef = this.oilTankModalRef(component, oilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    oilTankModalRef(component: Component, oilTank: OilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.oilTank = oilTank;
        modalRef.result.then(result => {
            this.closeModal(oilTank);
        },reason => {
            this.closeModal(oilTank);
        });
        return modalRef;
    }

    closeModal(oilTank) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
