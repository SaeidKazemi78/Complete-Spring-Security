import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoleLevel } from './role-level.model';
import { RoleLevelService } from './role-level.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RoleLevelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private roleLevelService: RoleLevelService

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
                this.roleLevelService.find(id).subscribe(roleLevelResponse => {
                    const roleLevel: RoleLevel = roleLevelResponse.body;
                    this.ngbModalRef = this.roleLevelModalRef(component, roleLevel);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const roleLevel = new RoleLevel();
                    this.ngbModalRef = this.roleLevelModalRef(component, roleLevel);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    roleLevelModalRef(component: Component, roleLevel: RoleLevel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.roleLevel = roleLevel;
        modalRef.result.then(result => {
            this.closeModal(roleLevel);
        },reason => {
            this.closeModal(roleLevel);
        });
        return modalRef;
    }

    closeModal(roleLevel) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
