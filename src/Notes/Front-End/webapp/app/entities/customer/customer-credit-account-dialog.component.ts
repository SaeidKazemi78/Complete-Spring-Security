import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Customer } from './customer.model';
import { CustomerPopupService } from './customer-popup.service';
import { CustomerService } from './customer.service';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {CustomerGroup, LocationType} from '../customer-type/customer-type.model';

@Component({
    selector: 'jhi-customer-credit-account-dialog',
    templateUrl: './customer-credit-account-dialog.component.html'
})
export class CustomerCreditAccountDialogComponent implements OnInit {

    CustomerGroup = CustomerGroup;
    LocationType = LocationType;
    customer: Customer;
    customerType: CustomerType;

    constructor(
        private customerService: CustomerService,
        private customerTypeService: CustomerTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.updateCreditAccount(this.customer).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit(): void {
        this.customerTypeService.find(this.customer.typeId).subscribe(value => {
           this.customerType = value.body;
        });
    }
}

@Component({
    selector: 'jhi-customer-credit-account-popup',
    template: ''
})
export class CustomerCreditAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerPopupService
                .open(CustomerCreditAccountDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
