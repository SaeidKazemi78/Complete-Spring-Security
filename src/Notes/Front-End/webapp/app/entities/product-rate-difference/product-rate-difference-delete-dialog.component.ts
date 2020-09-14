import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductRateDifference } from './product-rate-difference.model';
import { ProductRateDifferencePopupService } from './product-rate-difference-popup.service';
import { ProductRateDifferenceService } from './product-rate-difference.service';

@Component({
    selector: 'jhi-product-rate-difference-delete-dialog',
    templateUrl: './product-rate-difference-delete-dialog.component.html'
})
export class ProductRateDifferenceDeleteDialogComponent {

    productRateDifference: ProductRateDifference;

    constructor(
        private productRateDifferenceService: ProductRateDifferenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productRateDifferenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productRateDifferenceListModification',
                content: 'Deleted an productRateDifference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-rate-difference-delete-popup',
    template: ''
})
export class ProductRateDifferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRateDifferencePopupService: ProductRateDifferencePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productRateDifferencePopupService
                .open(ProductRateDifferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
