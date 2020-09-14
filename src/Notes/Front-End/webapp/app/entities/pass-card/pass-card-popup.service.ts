import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PassCard } from './pass-card.model';
import { PassCardService } from './pass-card.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PassCardPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private passCardService: PassCardService

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
                this.passCardService.find(id).subscribe(passCardResponse => {
                    const passCard: PassCard = passCardResponse.body;
                    this.ngbModalRef = this.passCardModalRef(component, passCard);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const passCard = new PassCard();
                    passCard.driverId = driverId;
                    this.ngbModalRef = this.passCardModalRef(component, passCard);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    passCardModalRef(component: Component, passCard: PassCard): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.passCard = passCard;
        modalRef.result.then(result => {
            this.closeModal(passCard);
        },reason => {
            this.closeModal(passCard);
        });
        return modalRef;
    }

    closeModal(passCard) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
