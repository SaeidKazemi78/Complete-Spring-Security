import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserPosDevice } from './user-pos-device.model';
import { UserPosDeviceService } from './user-pos-device.service';

@Injectable({ providedIn: 'root' })
export class UserPosDevicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private userPosDeviceService: UserPosDeviceService

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
                this.userPosDeviceService.find(id).subscribe(userPosDeviceResponse => {
                    const userPosDevice: UserPosDevice = userPosDeviceResponse.body;
                    this.ngbModalRef = this.userPosDeviceModalRef(component, userPosDevice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const userPosDevice = new UserPosDevice();
                    this.ngbModalRef = this.userPosDeviceModalRef(component, userPosDevice);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userPosDeviceModalRef(component: Component, userPosDevice: UserPosDevice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userPosDevice = userPosDevice;
        modalRef.result.then(result => {
            this.closeModal(userPosDevice);
        },reason => {
            this.closeModal(userPosDevice);
        });
        return modalRef;
    }

    closeModal(userPosDevice) {
        this.router.navigate(['user-pos-device', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
