import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Order } from './order.model';
import { OrderService } from './order.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class OrderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private orderService: OrderService

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
                this.orderService.find(id)
                    .subscribe((orderResponse: HttpResponse<Order>) => {
                        const order: Order = orderResponse.body;
                        this.ngbModalRef = this.orderModalRef(component, order);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.orderModalRef(component, new Order());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderModalRef(component: Component, order: Order): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.order = order;
        modalRef.result.then(result => {
            this.closeModal(order);
        },reason => {
            this.closeModal(order);
        });
        return modalRef;
    }

    closeModal(order) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
