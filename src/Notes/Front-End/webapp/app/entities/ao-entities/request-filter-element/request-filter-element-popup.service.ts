import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementService} from './request-filter-element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RequestFilterElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private requestFilterElementService: RequestFilterElementService
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
                this.requestFilterElementService.find(id).subscribe(requestFilterElementResponse => {
                    const requestFilterElement: RequestFilterElement = requestFilterElementResponse.body;
                    this.ngbModalRef = this.requestFilterElementModalRef(component, requestFilterElement);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const requestFilterElement = new RequestFilterElement();
                    this.ngbModalRef = this.requestFilterElementModalRef(component, requestFilterElement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestFilterElementModalRef(component: Component, requestFilterElement: RequestFilterElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestFilterElement = requestFilterElement;
        modalRef.result.then(result => {
            this.closeModal(requestFilterElement);
        },reason => {
            this.closeModal(requestFilterElement);
        });
        return modalRef;
    }

    closeModal(requestFilterElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
