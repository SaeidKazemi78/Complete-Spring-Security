import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Order, OrderType} from './order.model';
import {OrderPopupService} from './order-popup.service';
import {OrderService} from './order.service';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-order-invoice-dialog',
    templateUrl: './order-invoice-dialog.component.html'
})
export class OrderInvoiceDialogComponent {

    OrderType = OrderType;
    order: Order;
    force = false;
    startTime: any;
    endTime: any;

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
        this.orderService.downloadInvoice(this.startTime, this.endTime).subscribe(response => {
            saveAs(response.body, 'rcx.txt');
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-delete-popup',
    template: ''
})
export class OrderInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderInvoiceDialogComponent as Component, null);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
