import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerCredit } from './customer-credit.model';
import { CustomerCreditPopupService } from './customer-credit-popup.service';
import { CustomerCreditService } from './customer-credit.service';

@Component({
    selector: 'jhi-customer-credit-delete-dialog',
    templateUrl: './customer-credit-delete-dialog.component.html'
})
export class CustomerCreditDeleteDialogComponent implements OnInit {

    customerCredit: CustomerCredit;
    isPerson: boolean;

    constructor(
        private customerCreditService: CustomerCreditService,
        public activeModal: NgbActiveModal,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerCreditService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerCreditListModification',
                content: 'Deleted an customerCredit'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit(): void {
        this.isPerson = Person.isPerson;
    }
}

@Component({
    selector: 'jhi-customer-credit-delete-popup',
    template: ''
})
export class CustomerCreditDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerCreditPopupService: CustomerCreditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            Person.isPerson = !!this.route.snapshot.data['isPerson'] ;
            this.customerCreditPopupService
                .open(CustomerCreditDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class Person {
    static isPerson: boolean;
}
