import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import {Order, OrderType} from './order.model';
import { OrderPopupService } from './order-popup.service';
import { OrderService } from './order.service';

@Component({
    selector: 'jhi-order-confirm-dialog',
    templateUrl: './order-confirm-dialog.component.html'
})
export class OrderConfirmDialogComponent {

    OrderType = OrderType;
    order: Order;

    constructor(
        private orderService: OrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmConfirm(id: number) {
        this.orderService.confirm(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Confirmed an order'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-confirm-popup',
    template: ''
})
export class OrderConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
