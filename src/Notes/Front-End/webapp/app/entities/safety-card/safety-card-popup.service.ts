import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SafetyCard } from './safety-card.model';
import { SafetyCardService } from './safety-card.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SafetyCardPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private safetyCardService: SafetyCardService

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
                this.safetyCardService.find(id).subscribe(safetyCardResponse => {
                    const safetyCard: SafetyCard = safetyCardResponse.body;
                    this.ngbModalRef = this.safetyCardModalRef(component, safetyCard);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const safetyCard = new SafetyCard();
                    safetyCard.driverId = driverId;
                    this.ngbModalRef = this.safetyCardModalRef(component, safetyCard);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    safetyCardModalRef(component: Component, safetyCard: SafetyCard): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.safetyCard = safetyCard;
        modalRef.result.then(result => {
            this.closeModal(safetyCard);
        },reason => {
            this.closeModal(safetyCard);
        });
        return modalRef;
    }

    closeModal(safetyCard) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
