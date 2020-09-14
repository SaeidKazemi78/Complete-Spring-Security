import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import {Order, OrderType} from './order.model';
import { OrderPopupService } from './order-popup.service';
import { OrderService } from './order.service';

@Component({
    selector: 'jhi-order-revocation-dialog',
    templateUrl: './order-revocation-dialog.component.html'
})
export class OrderRevocationDialogComponent {

    OrderType = OrderType;
    order: Order;
    force = false;

    constructor(
        private orderService: OrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    revocation(id: number) {
        this.orderService.revocation(id, this.force).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Revocationed an order'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-revocation-popup',
    template: ''
})
export class OrderRevocationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderRevocationDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
