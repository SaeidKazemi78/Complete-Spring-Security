import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Order } from './order.model';
import { OrderPopupService } from './order-popup.service';
import { OrderService } from './order.service';

@Component({
    selector: 'jhi-order-revert-confirm-dialog',
    templateUrl: './order-revert-confirm-dialog.component.html'
})
export class OrderRevertConfirmDialogComponent {

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

    revertConfirm(id: number) {
        this.orderService.revertConfirm(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'RevertConfirmed an order'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-revert-confirm-popup',
    template: ''
})
export class OrderRevertConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderRevertConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
