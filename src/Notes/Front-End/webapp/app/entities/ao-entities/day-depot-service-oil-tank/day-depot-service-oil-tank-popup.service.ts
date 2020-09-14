import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {DayDepotServiceOilTankService} from './day-depot-service-oil-tank.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class DayDepotServiceOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private dayDepotServiceOilTankService: DayDepotServiceOilTankService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dayDepotServiceOilTankService.find(id)
                    .subscribe((dayDepotServiceOilTankResponse: HttpResponse<DayDepotServiceOilTank>) => {
                        const dayDepotServiceOilTank: DayDepotServiceOilTank = dayDepotServiceOilTankResponse.body;
                        this.ngbModalRef = this.dayDepotServiceOilTankModalRef(component, dayDepotServiceOilTank);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const dayDepotServiceOilTank = new DayDepotServiceOilTank();
                    dayDepotServiceOilTank.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.dayDepotServiceOilTankModalRef(component, dayDepotServiceOilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dayDepotServiceOilTankModalRef(component: Component, dayDepotServiceOilTank: DayDepotServiceOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dayDepotServiceOilTank = dayDepotServiceOilTank;
        modalRef.result.then(result => {
            this.closeModal(dayDepotServiceOilTank);
        },reason => {
            this.closeModal(dayDepotServiceOilTank);
        });
        return modalRef;
    }

    closeModal(dayDepotServiceOilTank) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
