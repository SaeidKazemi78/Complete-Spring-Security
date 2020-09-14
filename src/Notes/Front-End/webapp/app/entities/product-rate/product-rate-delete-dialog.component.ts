import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductRate } from './product-rate.model';
import { ProductRatePopupService } from './product-rate-popup.service';
import { ProductRateService } from './product-rate.service';

@Component({
    selector: 'jhi-product-rate-delete-dialog',
    templateUrl: './product-rate-delete-dialog.component.html'
})
export class ProductRateDeleteDialogComponent {

    productRate: ProductRate;

    constructor(
        private productRateService: ProductRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productRateListModification',
                content: 'Deleted an productRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-rate-delete-popup',
    template: ''
})
export class ProductRateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRatePopupService: ProductRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productRatePopupService
                .open(ProductRateDeleteDialogComponent as Component, params['type'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
