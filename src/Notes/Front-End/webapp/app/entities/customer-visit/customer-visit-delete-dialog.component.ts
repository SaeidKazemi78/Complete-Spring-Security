import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerVisit } from './customer-visit.model';
import { CustomerVisitPopupService } from './customer-visit-popup.service';
import { CustomerVisitService } from './customer-visit.service';

@Component({
    selector: 'jhi-customer-visit-delete-dialog',
    templateUrl: './customer-visit-delete-dialog.component.html'
})
export class CustomerVisitDeleteDialogComponent {

    customerVisit: CustomerVisit;

    constructor(
        private customerVisitService: CustomerVisitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerVisitService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerVisitListModification',
                content: 'Deleted an customerVisit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-visit-delete-popup',
    template: ''
})
export class CustomerVisitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerVisitPopupService: CustomerVisitPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerVisitPopupService
                .open(CustomerVisitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
