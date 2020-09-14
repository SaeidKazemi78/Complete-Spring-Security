import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserToken } from './user-token.model';
import { UserTokenService } from './user-token.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class UserTokenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private userTokenService: UserTokenService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, username?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userTokenService.find(id)
                    .subscribe((userTokenResponse: HttpResponse<UserToken>) => {
                        const userToken: UserToken = userTokenResponse.body;
                        userToken.username = username;
                        this.ngbModalRef = this.userTokenModalRef(component, userToken);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const userToken = new UserToken();
                    userToken.username = username;
                    this.ngbModalRef = this.userTokenModalRef(component, userToken);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userTokenModalRef(component: Component, userToken: UserToken): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userToken = userToken;
        modalRef.result.then((result) => {
            this.closeModal(userToken);
        }, (reason) => {
            this.closeModal(userToken);
        });
        return modalRef;
    }

    closeModal(userToken) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
