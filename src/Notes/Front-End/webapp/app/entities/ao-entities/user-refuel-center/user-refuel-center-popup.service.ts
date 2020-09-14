import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UserRefuelCenter} from './user-refuel-center.model';
import {UserRefuelCenterService} from './user-refuel-center.service';

@Injectable({ providedIn: 'root' })
export class UserRefuelCenterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userRefuelCenterService: UserRefuelCenterService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, username: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            this.userRefuelCenterService.findByUsername(username).subscribe(userRefuelCenterResponse => {
                const userRefuelCenter: UserRefuelCenter = userRefuelCenterResponse.body;
                this.ngbModalRef = this.userRefuelCenterModalRef(component, userRefuelCenter);
                resolve(this.ngbModalRef);
            });
        });
    }

    userRefuelCenterModalRef(component: Component, userRefuelCenter: UserRefuelCenter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userRefuelCenter = userRefuelCenter;
        modalRef.result.then(result => {
            this.closeModal(userRefuelCenter);
        },reason => {
            this.closeModal(userRefuelCenter);
        });
        return modalRef;
    }

    closeModal(userRefuelCenter) {
        this.router.navigate(['user-management', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
