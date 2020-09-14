import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {BoundarySellPopupService} from 'app/entities/boundary-sell/boundary-sell-popup.service';
import {Order, OrderType, OrderService} from 'app/entities/order';

@Component({
    selector: 'jhi-boundary-sell-delete-dialog',
    templateUrl: './boundary-sell-delete-dialog.component.html'
})
export class BoundarySellDeleteDialogComponent {

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

    confirmDelete(id: number, force) {
        this.orderService.delete(id, force).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Deleted an order'
            });
            this.eventManager.broadcast({
                name: 'orderDeleted' + id,
                content: 'Deleted an order'
            });
            this.activeModal.dismiss(true);

        });
    }
}

@Component({
    selector: 'jhi-boundary-sell-delete-popup',
    template: ''
})
export class BoundarySellDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundarySellPopupService: BoundarySellPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundarySellPopupService
                .open(BoundarySellDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
