import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import {BoundarySellPopupService} from 'app/entities/boundary-sell/boundary-sell-popup.service';
import {Order, OrderType, OrderService} from 'app/entities/order';

@Component({
    selector: 'jhi-boundary-sell-confirm-dialog',
    templateUrl: './boundary-sell-confirm-dialog.component.html'
})
export class BoundarySellConfirmDialogComponent {

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
    selector: 'jhi-boundary-sell-confirm-popup',
    template: ''
})
export class BoundarySellConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundarySellPopupService: BoundarySellPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundarySellPopupService
                .open(BoundarySellConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
