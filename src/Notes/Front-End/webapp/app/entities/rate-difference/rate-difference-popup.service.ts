import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {RateDifference} from './rate-difference.model';
import {RateDifferenceService} from './rate-difference.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class RateDifferencePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rateDifferenceService: RateDifferenceService
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
                this.rateDifferenceService.find(id).subscribe(rateDifferenceResponse => {
                    const rateDifference: RateDifference = rateDifferenceResponse.body;
                    this.ngbModalRef = this.rateDifferenceModalRef(component, rateDifference);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const rateDifference = new RateDifference();
                    this.ngbModalRef = this.rateDifferenceModalRef(component, rateDifference);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateDifferenceModalRef(component: Component, rateDifference: RateDifference): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rateDifference = rateDifference;
        modalRef.result.then(result => {
            this.closeModal(rateDifference);
        }, reason => {
            this.closeModal(rateDifference);
        });
        return modalRef;
    }

    closeModal(rateDifference) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {
            replaceUrl: true,
            queryParams: {mode: rateDifference.rateDifferenceType === 'RATE_DIFFERENCE' ? 'rate-difference' : 'tank-capacity'},
            queryParamsHandling: 'merge'
        });
        this.ngbModalRef = null;
    }

}
