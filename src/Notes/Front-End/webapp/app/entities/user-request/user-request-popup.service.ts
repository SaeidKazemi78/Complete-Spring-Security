import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { User } from '../../shared';
import { UserRequestService } from './user-request.service';

@Injectable({ providedIn: 'root' })
export class UserRequestPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private userManagementService: UserRequestService

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
                this.userManagementService.find(id).subscribe(user => {
                    this.ngbModalRef = this.userManagementModalRef(component, user.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const userManagement = new User();
                    this.ngbModalRef = this.userManagementModalRef(component, userManagement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userManagementModalRef(component: Component, user: User): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userRequest = user;
        modalRef.result.then(result => {
            this.closeModal(user);
        },reason => {
            this.closeModal(user);
        });
        return modalRef;
    }

    closeModal(userRequest) {
        this.router.navigate(['user-request', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
