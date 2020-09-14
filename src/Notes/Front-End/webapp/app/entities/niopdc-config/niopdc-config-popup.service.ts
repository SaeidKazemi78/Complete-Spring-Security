import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NiopdcConfig } from './niopdc-config.model';
import { NiopdcConfigService } from './niopdc-config.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class NiopdcConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private niopdcConfigService: NiopdcConfigService

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
                this.niopdcConfigService.find(id).subscribe(niopdcConfig => {
                    this.ngbModalRef = this.niopdcConfigModalRef(component, niopdcConfig.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const niopdcConfig = new NiopdcConfig();
                    this.ngbModalRef = this.niopdcConfigModalRef(component, niopdcConfig);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    niopdcConfigModalRef(component: Component, niopdcConfig: NiopdcConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.niopdcConfig = niopdcConfig;
        modalRef.result.then(result => {
            this.closeModal(niopdcConfig);
        },reason => {
            this.closeModal(niopdcConfig);
        });
        return modalRef;
    }

    closeModal(niopdcConfig) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
