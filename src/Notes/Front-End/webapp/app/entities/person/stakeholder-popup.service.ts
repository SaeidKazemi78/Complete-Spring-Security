import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Stakeholder } from './stakeholder.model';
import { StakeholderService } from './stakeholder.service';

@Injectable({ providedIn: 'root' })
export class StakeholderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stakeholderService: StakeholderService

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
                this.stakeholderService.find(id)
                    .subscribe((stakeholderResponse: HttpResponse<Stakeholder>) => {
                        const stakeholder: Stakeholder = stakeholderResponse.body;
                        this.ngbModalRef = this.stakeholderModalRef(component, stakeholder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stakeholderModalRef(component, new Stakeholder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stakeholderModalRef(component: Component, stakeholder: Stakeholder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stakeholder = stakeholder;
        modalRef.result.then(result => {
            this.router.navigate(['stakeholder', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, reason => {
            this.router.navigate(['stakeholder', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
