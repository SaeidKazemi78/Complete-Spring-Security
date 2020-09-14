import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerCapacity } from './customer-capacity.model';
import { CustomerCapacityPopupService } from './customer-capacity-popup.service';
import { CustomerCapacityService } from './customer-capacity.service';

@Component({
    selector: 'jhi-customer-capacity-delete-dialog',
    templateUrl: './customer-capacity-delete-dialog.component.html'
})
export class CustomerCapacityDeleteDialogComponent {

    customerCapacity: CustomerCapacity;

    constructor(
        private customerCapacityService: CustomerCapacityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerCapacityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerCapacityListModification',
                content: 'Deleted an customerCapacity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-capacity-delete-popup',
    template: ''
})
export class CustomerCapacityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerCapacityPopupService: CustomerCapacityPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerCapacityPopupService
                .open(CustomerCapacityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
