import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {BoundarySellPopupService} from 'app/entities/boundary-sell/boundary-sell-popup.service';
import {Order, OrderType, OrderService} from 'app/entities/order';

@Component({
    selector: 'jhi-boundary-sell-de-active-dialog',
    templateUrl: './boundary-sell-de-active-dialog.component.html'
})
export class BoundarySellDeActiveDialogComponent {

    OrderType = OrderType;
    order: Order;
    force = false;

    constructor(
        private router: Router,
        private orderService: OrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDeActive(id: number) {
        this.orderService.deActive(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'deActive an order'
            });
            this.eventManager.broadcast({
                name: 'orderDeActive' + id,
                content: 'deActive an order'
            });
            this.activeModal.dismiss(true);

        });
    }
}

@Component({
    selector: 'jhi-boundary-sell-de-active-popup',
    template: ''
})
export class BoundarySellDeActivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundarySellPopupService: BoundarySellPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundarySellPopupService
                .open(BoundarySellDeActiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
