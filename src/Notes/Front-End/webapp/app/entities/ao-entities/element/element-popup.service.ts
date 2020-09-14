import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Element} from './element.model';
import {ElementService} from './element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private elementService: ElementService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, filterId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.elementService.find(id).subscribe(elementResponse => {
                    const element: Element = elementResponse.body;
                    this.ngbModalRef = this.elementModalRef(component, element);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const element = new Element();
                    element.filterId = filterId;
                    this.ngbModalRef = this.elementModalRef(component, element);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    elementModalRef(component: Component, element: Element): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.element = element;
        modalRef.result.then(result => {
            this.closeModal(element);
        },reason => {
            this.closeModal(element);
        });
        return modalRef;
    }

    closeModal(element) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
