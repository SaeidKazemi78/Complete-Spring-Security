import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MainAuthority } from './main-authority.model';
import { MainAuthorityService } from './main-authority.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class MainAuthorityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private mainAuthorityService: MainAuthorityService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, parentAuthorityId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.mainAuthorityService.find(id)
                    .subscribe((mainAuthorityResponse: HttpResponse<MainAuthority>) => {
                        const mainAuthority: MainAuthority = mainAuthorityResponse.body;
                        this.ngbModalRef = this.mainAuthorityModalRef(component, mainAuthority);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const mainAuthority = new MainAuthority();
                    mainAuthority.parentAuthorityId = parentAuthorityId;
                    this.mainAuthorityModalRef(component, mainAuthority);

                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mainAuthorityModalRef(component: Component, mainAuthority: MainAuthority): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mainAuthority = mainAuthority;
        modalRef.result.then(result => {
            this.closeModal(mainAuthority);
        },reason => {
            this.closeModal(mainAuthority);
        });
        return modalRef;
    }

    closeModal(mainAuthority) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
