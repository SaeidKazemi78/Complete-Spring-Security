import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {ChangeRequestElement} from './change-request-element.model';
import {ChangeRequestElementService} from './change-request-element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ChangeRequestElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private changeRequestElementService: ChangeRequestElementService
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
                this.changeRequestElementService.find(id)
                    .subscribe((changeRequestElementResponse: HttpResponse<ChangeRequestElement>) => {
                        const changeRequestElement: ChangeRequestElement = changeRequestElementResponse.body;
                        this.ngbModalRef = this.changeRequestElementModalRef(component, changeRequestElement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.changeRequestElementModalRef(component, new ChangeRequestElement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    changeRequestElementModalRef(component: Component, changeRequestElement: ChangeRequestElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.changeRequestElement = changeRequestElement;
        modalRef.result.then(result => {
            this.closeModal(changeRequestElement);
        },reason => {
            this.closeModal(changeRequestElement);
        });
        return modalRef;
    }

    closeModal(changeRequestElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
