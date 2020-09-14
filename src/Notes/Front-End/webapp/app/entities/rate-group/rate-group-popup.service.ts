import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RateGroup } from './rate-group.model';
import { RateGroupService } from './rate-group.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RateGroupPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rateGroupService: RateGroupService

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
                this.rateGroupService.find(id)
                    .subscribe((rateGroupResponse: HttpResponse<RateGroup>) => {
                        const rateGroup: RateGroup = rateGroupResponse.body;
                        this.ngbModalRef = this.rateGroupModalRef(component, rateGroup);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateGroupModalRef(component, new RateGroup());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateGroupModalRef(component: Component, rateGroup: RateGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rateGroup = rateGroup;
        modalRef.result.then(result => {
            this.closeModal(rateGroup);
        },reason => {
            this.closeModal(rateGroup);
        });
        return modalRef;
    }

    closeModal(rateGroup) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
