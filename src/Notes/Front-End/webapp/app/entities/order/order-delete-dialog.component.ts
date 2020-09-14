import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Order, OrderType} from './order.model';
import {OrderPopupService} from './order-popup.service';
import {OrderService} from './order.service';

@Component({
    selector: 'jhi-order-delete-dialog',
    templateUrl: './order-delete-dialog.component.html'
})
export class OrderDeleteDialogComponent {

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
    selector: 'jhi-order-delete-popup',
    template: ''
})
export class OrderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
