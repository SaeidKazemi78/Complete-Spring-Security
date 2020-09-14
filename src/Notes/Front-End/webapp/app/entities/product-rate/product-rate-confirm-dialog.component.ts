import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductRate } from './product-rate.model';
import { ProductRatePopupService } from './product-rate-popup.service';
import { ProductRateService } from './product-rate.service';

@Component({
    selector: 'jhi-product-rate-confirm-dialog',
    templateUrl: './product-rate-confirm-dialog.component.html'
})
export class ProductRateConfirmDialogComponent {

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

    confirm(id: number) {
        this.productRateService.confirm(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productRateListModification',
                content: 'Confirmd an productRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-rate-confirm-popup',
    template: ''
})
export class ProductRateConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRatePopupService: ProductRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productRatePopupService
                .open(ProductRateConfirmDialogComponent as Component, params['type'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
