import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {RequestPlunging} from './request-plunging.model';
import {RequestPlungingService} from './request-plunging.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RequestPlungingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private requestPlungingService: RequestPlungingService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.requestPlungingService.find(id)
                    .subscribe((requestPlungingResponse: HttpResponse<RequestPlunging>) => {
                        const requestPlunging: RequestPlunging = requestPlungingResponse.body;
                        this.ngbModalRef = this.requestPlungingModalRef(component, requestPlunging);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.requestPlungingModalRef(component, new RequestPlunging());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestPlungingModalRef(component: Component, requestPlunging: RequestPlunging): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestPlunging = requestPlunging;
        modalRef.result.then(result => {
            this.closeModal(requestPlunging);
        },reason => {
            this.closeModal(requestPlunging);
        });
        return modalRef;
    }

    closeModal(requestPlunging) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
