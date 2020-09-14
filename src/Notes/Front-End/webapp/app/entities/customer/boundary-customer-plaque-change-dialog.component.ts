import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {BoundaryCustomer, Customer} from './customer.model';
import {CustomerPopupService} from './customer-popup.service';
import {CustomerService} from './customer.service';

@Component({
    selector: 'jhi-boundary-customer-plaque-change-dialog',
    templateUrl: './boundary-customer-plaque-change-dialog.component.html'
})
export class BoundaryCustomerPlaqueChangeDialogComponent implements OnInit {

    boundaryCustomer: BoundaryCustomer = new BoundaryCustomer();
    customer: Customer;
    isPlaqueChangeValid = false;

    constructor(
        private customerService: CustomerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.customerService.plaqueChange(this.boundaryCustomer).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'changePlaque an customer'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit() {
        this.boundaryCustomer.customerId = this.customer.id;
        this.boundaryCustomer.oldCustomPlaque = this.customer.customPlaque;
        this.boundaryCustomer.oldCustomPlaqueTwo = this.customer.customPlaqueTwo;
    }
}

@Component({
    selector: 'jhi-boundary-customer-plaque-change-popup',
    template: ''
})
export class BoundaryCustomerPlaqueChangePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {

            this.customerPopupService
                .open(BoundaryCustomerPlaqueChangeDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
