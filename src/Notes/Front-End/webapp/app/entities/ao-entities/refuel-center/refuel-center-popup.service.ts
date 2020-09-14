import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {RefuelCenter} from './refuel-center.model';
import {RefuelCenterService} from './refuel-center.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RefuelCenterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private refuelCenterService: RefuelCenterService
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
                this.refuelCenterService.find(id)
                    .subscribe((refuelCenterResponse: HttpResponse<RefuelCenter>) => {
                        const refuelCenter: RefuelCenter = refuelCenterResponse.body;
                        this.ngbModalRef = this.refuelCenterModalRef(component, refuelCenter);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const refuelCenter = new RefuelCenter();
                    this.ngbModalRef = this.refuelCenterModalRef(component, refuelCenter);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    refuelCenterModalRef(component: Component, refuelCenter: RefuelCenter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.refuelCenter = refuelCenter;
        modalRef.result.then(result => {
            this.closeModal(refuelCenter);
        },reason => {
            this.closeModal(refuelCenter);
        });
        return modalRef;
    }

    closeModal(refuelCenter) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
