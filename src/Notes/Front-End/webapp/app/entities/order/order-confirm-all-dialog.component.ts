import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {OrderPopupService} from './order-popup.service';
import {OrderService} from './order.service';
import {RefuelCenter, RefuelCenterService} from "app/entities/ao-entities/refuel-center";

@Component({
    selector: 'jhi-order-confirm-dialog',
    templateUrl: './order-confirm-all-dialog.component.html'
})
export class OrderConfirmAllDialogComponent implements OnInit {

    refuelCenters: RefuelCenter[] = [];
    refuelCenterId: number;

    constructor(
        private orderService: OrderService,
        public activeModal: NgbActiveModal,
        private refuelCenterService: RefuelCenterService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmConfirm() {
        this.orderService.confirmAll(this.refuelCenterId).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Confirmed an order'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit(): void {
        this.refuelCenterService.queryByReadAccess()
            .subscribe(value => {
                this.refuelCenters = value.body;
                if (this.refuelCenters && this.refuelCenters.length === 1) {
                    this.refuelCenterId = this.refuelCenters[0].id;
                }
            });
    }
}

@Component({
    selector: 'jhi-order-confirm-popup',
    template: ''
})
export class OrderConfirmAllPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderPopupService
                .open(OrderConfirmAllDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
