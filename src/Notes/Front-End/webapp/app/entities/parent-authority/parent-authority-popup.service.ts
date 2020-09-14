import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ParentAuthority } from './parent-authority.model';
import { ParentAuthorityService } from './parent-authority.service';

@Injectable({ providedIn: 'root' })
export class ParentAuthorityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private parentAuthorityService: ParentAuthorityService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>(resolve => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.parentAuthorityService.find(id)
                    .subscribe((parentAuthorityResponse: HttpResponse<ParentAuthority>) => {
                        const parentAuthority: ParentAuthority = parentAuthorityResponse.body;
                        this.ngbModalRef = this.parentAuthorityModalRef(component, parentAuthority);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                        this.parentAuthorityModalRef(component, new ParentAuthority());

                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    parentAuthorityModalRef(component: Component, parentAuthority: ParentAuthority): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.parentAuthority = parentAuthority;
        modalRef.result.then(result => {
            this.closeModal(parentAuthority);
        },reason => {
            this.closeModal(parentAuthority);
        });
        return modalRef;
    }

    closeModal(parentAuthority) {
        this.router.navigate(['parent-authority', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
