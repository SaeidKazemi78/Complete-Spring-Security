import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DangerousCertificate } from './dangerous-certificate.model';
import { DangerousCertificateService } from './dangerous-certificate.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class DangerousCertificatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private dangerousCertificateService: DangerousCertificateService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, driverId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dangerousCertificateService.find(id).subscribe(dangerousCertificateResponse => {
                    const dangerousCertificate: DangerousCertificate = dangerousCertificateResponse.body;
                    this.ngbModalRef = this.dangerousCertificateModalRef(component, dangerousCertificate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const dangerousCertificate = new DangerousCertificate();
                    dangerousCertificate.driverId = driverId;
                    this.ngbModalRef = this.dangerousCertificateModalRef(component, dangerousCertificate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dangerousCertificateModalRef(component: Component, dangerousCertificate: DangerousCertificate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dangerousCertificate = dangerousCertificate;
        modalRef.result.then(result => {
            this.closeModal(dangerousCertificate);
        },reason => {
            this.closeModal(dangerousCertificate);
        });
        return modalRef;
    }

    closeModal(dangerousCertificate) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
