import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {OilTankStatus, ServiceOilTank} from './service-oil-tank.model';
import {ServiceOilTankService} from './service-oil-tank.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class ServiceOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private serviceOilTankService: ServiceOilTankService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, oilTankId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.serviceOilTankService.find(id)
                    .subscribe((serviceOilTankResponse: HttpResponse<ServiceOilTank>) => {
                        const serviceOilTank: ServiceOilTank = serviceOilTankResponse.body;
                        this.ngbModalRef = this.serviceOilTankModalRef(component, serviceOilTank);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const serviceOilTank = new ServiceOilTank();
                    serviceOilTank.oilTankId = oilTankId;
                    serviceOilTank.oilTankStatus = OilTankStatus[OilTankStatus.ACTIVE];
                    this.ngbModalRef = this.serviceOilTankModalRef(component, serviceOilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceOilTankModalRef(component: Component, serviceOilTank: ServiceOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceOilTank = serviceOilTank;
        modalRef.result.then(result => {
            this.closeModal(serviceOilTank);
        },reason => {
            this.closeModal(serviceOilTank);
        });
        return modalRef;
    }

    closeModal(serviceOilTank) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {
            replaceUrl: true,
            queryParamsHandling: 'merge'
        });
        this.ngbModalRef = null;
    }

}
