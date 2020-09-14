import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserConfig } from './user-config.model';
import { UserConfigService } from './user-config.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class UserConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private userConfigService: UserConfigService

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
                this.userConfigService.find(id).subscribe(userConfigResponse => {
                    const userConfig: UserConfig = userConfigResponse.body;
                    this.ngbModalRef = this.userConfigModalRef(component, userConfig);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const userConfig = new UserConfig();
                    this.ngbModalRef = this.userConfigModalRef(component, userConfig);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userConfigModalRef(component: Component, userConfig: UserConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userConfig = userConfig;
        modalRef.result.then(result => {
            this.closeModal(userConfig);
        },reason => {
            this.closeModal(userConfig);
        });
        return modalRef;
    }

    closeModal(userConfig) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
