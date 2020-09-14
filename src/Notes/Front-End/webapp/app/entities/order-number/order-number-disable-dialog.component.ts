import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderNumber } from './order-number.model';
import { OrderNumberPopupService } from './order-number-popup.service';
import { OrderNumberService } from './order-number.service';

@Component({
    selector: 'jhi-order-number-disable-dialog',
    templateUrl: './order-number-disable-dialog.component.html'
})
export class OrderNumberDisableDialogComponent {

    orderNumber: OrderNumber;

    constructor(
        private orderNumberService: OrderNumberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDisable(id: number) {
        this.orderNumberService.disable(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderNumberListModification',
                content: 'disable an orderNumber'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-number-disable-popup',
    template: ''
})
export class OrderNumberDisablePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderNumberPopupService: OrderNumberPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.orderNumberPopupService
                .open(OrderNumberDisableDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
