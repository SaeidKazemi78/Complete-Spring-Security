import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ChangeFilterElement} from './change-filter-element.model';
import {ChangeFilterElementService} from './change-filter-element.service';
import {RequestFilterElement, RequestFilterElementService} from '../request-filter-element';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ChangeFilterElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private changeFilterElementService: ChangeFilterElementService,
        private requestFilterElementService: RequestFilterElementService
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
                this.changeFilterElementService.find(id).subscribe(changeFilterElementResponse => {
                    const changeFilterElement: ChangeFilterElement = changeFilterElementResponse.body;
                    this.ngbModalRef = this.changeFilterElementModalRef(component, changeFilterElement);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const changeFilterElement = new ChangeFilterElement();
                    changeFilterElement.requestFilterElementId = requestFilterElementId;

                    this.requestFilterElementService.find(requestFilterElementId).subscribe(requestFilterElementResponse => {
                        const requestFilterElement: RequestFilterElement = requestFilterElementResponse.body;
                        changeFilterElement.requestFilterElement = requestFilterElement;
                        if (changeFilterElement.requestFilterElement.changeFilterElementId != null) {

                            this.changeFilterElementService.find(changeFilterElement.requestFilterElement.changeFilterElementId).subscribe(changeFilterElementResponse => {
                                const changeFilterElement: ChangeFilterElement = changeFilterElementResponse.body;
                                changeFilterElement.requestFilterElement = requestFilterElement;
                                this.ngbModalRef = this.changeFilterElementModalRef(component, changeFilterElement);
                                resolve(this.ngbModalRef);
                            });

                        } else {
                            this.ngbModalRef = this.changeFilterElementModalRef(component, changeFilterElement);
                            resolve(this.ngbModalRef);
                        }

                    });

                }, 0);
            }
        });
    }

    changeFilterElementModalRef(component: Component, changeFilterElement: ChangeFilterElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.changeFilterElement = changeFilterElement;
        modalRef.result.then(result => {
            this.closeModal(changeFilterElement);
        },reason => {
            this.closeModal(changeFilterElement);
        });
        return modalRef;
    }

    closeModal(changeFilterElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
