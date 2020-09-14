import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {ChangeContainer} from './change-container.model';
import {ChangeContainerService} from './change-container.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ChangeContainerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private changeContainerService: ChangeContainerService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotContainerId?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.changeContainerService.find(id)
                    .subscribe((changeContainerResponse: HttpResponse<ChangeContainer>) => {
                        const changeContainer: ChangeContainer = changeContainerResponse.body;
                        this.ngbModalRef = this.changeContainerModalRef(component, changeContainer);
                        resolve(this.ngbModalRef);
                    });
            } else if (dayDepotId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const changeContainer = new ChangeContainer();
                    changeContainer.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.changeContainerModalRef(component, changeContainer);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const changeContainer = new ChangeContainer();
                    changeContainer.sourceId = dayDepotContainerId;
                    this.ngbModalRef = this.changeContainerModalRef(component, changeContainer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    changeContainerModalRef(component: Component, changeContainer: ChangeContainer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.changeContainer = changeContainer;
        modalRef.result.then(result => {
            this.closeModal(changeContainer);
        },reason => {
            this.closeModal(changeContainer);
        });
        return modalRef;
    }

    closeModal(changeContainer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
