import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeProductConsumption } from './customer-type-product-consumption.model';
import { CustomerTypeProductConsumptionPopupService } from './customer-type-product-consumption-popup.service';
import { CustomerTypeProductConsumptionService } from './customer-type-product-consumption.service';

@Component({
    selector: 'jhi-customer-type-product-consumption-delete-dialog',
    templateUrl: './customer-type-product-consumption-delete-dialog.component.html'
})
export class CustomerTypeProductConsumptionDeleteDialogComponent {

    customerTypeProductConsumption: CustomerTypeProductConsumption;

    constructor(
        private customerTypeProductConsumptionService: CustomerTypeProductConsumptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerTypeProductConsumptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerTypeProductConsumptionListModification',
                content: 'Deleted an customerTypeProductConsumption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-type-product-consumption-delete-popup',
    template: ''
})
export class CustomerTypeProductConsumptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypeProductConsumptionPopupService: CustomerTypeProductConsumptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerTypeProductConsumptionPopupService
                .open(CustomerTypeProductConsumptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
