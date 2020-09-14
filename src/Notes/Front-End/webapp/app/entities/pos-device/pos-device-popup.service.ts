import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PosDevice, PosDeviceAccount} from './pos-device.model';
import {PosDeviceService} from './pos-device.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PosDevicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private posDeviceService: PosDeviceService
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
                this.posDeviceService.find(id).subscribe(posDeviceResponse => {
                    const posDevice: PosDevice = posDeviceResponse.body;
                    this.ngbModalRef = this.posDeviceModalRef(component, posDevice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const posDevice = new PosDevice();
                    posDevice.posDeviceAccounts = [];
                    const posDeviceAccount = new PosDeviceAccount();
                    posDeviceAccount.tid = 1;
                    posDevice.posDeviceAccounts.push(posDeviceAccount);
                    this.ngbModalRef = this.posDeviceModalRef(component, posDevice);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    posDeviceModalRef(component: Component, posDevice: PosDevice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.posDevice = posDevice;
        modalRef.result.then(result => {
            this.closeModal(posDevice);
        },reason => {
            this.closeModal(posDevice);
        });
        return modalRef;
    }

    closeModal(posDevice) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
