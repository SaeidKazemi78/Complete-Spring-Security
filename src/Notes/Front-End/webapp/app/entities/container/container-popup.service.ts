import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Container } from './container.model';
import { ContainerService } from './container.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ContainerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private containerService: ContainerService

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
                this.containerService.find(id)
                    .subscribe((containerResponse: HttpResponse<Container>) => {
                        const container: Container = containerResponse.body;
                        this.ngbModalRef = this.containerModalRef(component, container);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.containerModalRef(component, new Container());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    containerModalRef(component: Component, container: Container): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.container = container;
        modalRef.result.then(result => {
            this.closeModal(container);
        },reason => {
            this.closeModal(container);
        });
        return modalRef;
    }

    closeModal(container) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
