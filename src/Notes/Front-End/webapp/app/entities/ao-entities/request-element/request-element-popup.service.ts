import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RequestElement} from './request-element.model';
import {RequestElementService} from './request-element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RequestElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private requestElementService: RequestElementService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, requestFilterElementId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.requestElementService.find(id).subscribe(requestElementResponse => {
                    const requestElement: RequestElement = requestElementResponse.body;
                    this.ngbModalRef = this.requestElementModalRef(component, requestElement);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const requestElement = new RequestElement();
                    requestElement.requestFilterElementId = requestFilterElementId;
                    this.ngbModalRef = this.requestElementModalRef(component, requestElement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestElementModalRef(component: Component, requestElement: RequestElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestElement = requestElement;
        modalRef.result.then(result => {
            this.closeModal(requestElement);
        },reason => {
            this.closeModal(requestElement);
        });
        return modalRef;
    }

    closeModal(requestElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
