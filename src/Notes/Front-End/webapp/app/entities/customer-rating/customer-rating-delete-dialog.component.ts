import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerRating } from './customer-rating.model';
import { CustomerRatingPopupService } from './customer-rating-popup.service';
import { CustomerRatingService } from './customer-rating.service';

@Component({
    selector: 'jhi-customer-rating-delete-dialog',
    templateUrl: './customer-rating-delete-dialog.component.html'
})
export class CustomerRatingDeleteDialogComponent {

    customerRating: CustomerRating;

    constructor(
        private customerRatingService: CustomerRatingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerRatingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerRatingListModification',
                content: 'Deleted an customerRating'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-rating-delete-popup',
    template: ''
})
export class CustomerRatingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerRatingPopupService: CustomerRatingPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerRatingPopupService
                .open(CustomerRatingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
