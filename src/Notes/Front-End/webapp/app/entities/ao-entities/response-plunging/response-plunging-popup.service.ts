import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ResponsePlunging} from './response-plunging.model';
import {ResponsePlungingService} from './response-plunging.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ResponsePlungingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private responsePlungingService: ResponsePlungingService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, requestPlungingId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.responsePlungingService.find(id)
                    .subscribe((responsePlungingResponse: HttpResponse<ResponsePlunging>) => {
                        const responsePlunging: ResponsePlunging = responsePlungingResponse.body;
                        this.ngbModalRef = this.responsePlungingModalRef(component, responsePlunging);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const responsePlunging = new ResponsePlunging();
                    responsePlunging.requestPlungingId = requestPlungingId;
                    this.ngbModalRef = this.responsePlungingModalRef(component, responsePlunging);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    responsePlungingModalRef(component: Component, responsePlunging: ResponsePlunging): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.responsePlunging = responsePlunging;
        modalRef.result.then(result => {
            this.closeModal(responsePlunging);
        },reason => {
            this.closeModal(responsePlunging);
        });
        return modalRef;
    }

    closeModal(responsePlunging) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
