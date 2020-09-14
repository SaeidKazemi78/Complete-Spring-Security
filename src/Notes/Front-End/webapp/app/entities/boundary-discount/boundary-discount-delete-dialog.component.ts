import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BoundaryDiscount } from './boundary-discount.model';
import { BoundaryDiscountPopupService } from './boundary-discount-popup.service';
import { BoundaryDiscountService } from './boundary-discount.service';

@Component({
    selector: 'jhi-boundary-discount-delete-dialog',
    templateUrl: './boundary-discount-delete-dialog.component.html'
})
export class BoundaryDiscountDeleteDialogComponent {

    boundaryDiscount: BoundaryDiscount;

    constructor(
        private boundaryDiscountService: BoundaryDiscountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.boundaryDiscountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'boundaryDiscountListModification',
                content: 'Deleted an boundaryDiscount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-boundary-discount-delete-popup',
    template: ''
})
export class BoundaryDiscountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundaryDiscountPopupService: BoundaryDiscountPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundaryDiscountPopupService
                .open(BoundaryDiscountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
