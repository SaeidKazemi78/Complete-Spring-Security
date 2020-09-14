import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Route } from './route.model';
import { RouteService } from './route.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RoutePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private routeService: RouteService

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
                this.routeService.find(id).subscribe(routeResponse => {
                    const route: Route = routeResponse.body;
                    this.ngbModalRef = this.routeModalRef(component, route);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const route = new Route();
                    this.ngbModalRef = this.routeModalRef(component, route);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    routeModalRef(component: Component, route: Route): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.route = route;
        modalRef.result.then(result => {
            this.closeModal(route);
        },reason => {
            this.closeModal(route);
        });
        return modalRef;
    }

    closeModal(route) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
