import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MilliPoor} from './milli-poor.model';
import {MilliPoorService} from './milli-poor.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class MilliPoorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private milliPoorService: MilliPoorService
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
                this.milliPoorService.find(id)
                    .subscribe((milliPoorResponse: HttpResponse<MilliPoor>) => {
                        const milliPoor: MilliPoor = milliPoorResponse.body;
                        this.ngbModalRef = this.milliPoorModalRef(component, milliPoor);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.milliPoorModalRef(component, new MilliPoor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    milliPoorModalRef(component: Component, milliPoor: MilliPoor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.milliPoor = milliPoor;
        modalRef.result.then(result => {
            this.closeModal(milliPoor);
        },reason => {
            this.closeModal(milliPoor);
        });
        return modalRef;
    }

    closeModal(milliPoor) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
