import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ReceivedProductContainer} from './received-product-container.model';
import {ReceivedProductContainerService} from './received-product-container.service';
import {HttpResponse} from '@angular/common/http';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ReceivedProductContainerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private receivedProductContainerService: ReceivedProductContainerService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotContainerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.receivedProductContainerService.find(id)
                    .subscribe((receivedProductContainerResponse: HttpResponse<ReceivedProductContainer>) => {
                        const receivedProductContainer: ReceivedProductContainer = receivedProductContainerResponse.body;
                        this.ngbModalRef = this.receivedProductContainerModalRef(component, receivedProductContainer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const receivedProductContainer = new ReceivedProductContainer();
                    receivedProductContainer.dayDepotContainerId = dayDepotContainerId;
                    this.ngbModalRef = this.receivedProductContainerModalRef(component, receivedProductContainer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    receivedProductContainerModalRef(component: Component, receivedProductContainer: ReceivedProductContainer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.receivedProductContainer = receivedProductContainer;
        modalRef.result.then(result => {
            this.closeModal(receivedProductContainer);
        },reason => {
            this.closeModal(receivedProductContainer);
        });
        return modalRef;
    }

    closeModal(receivedProductContainer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
