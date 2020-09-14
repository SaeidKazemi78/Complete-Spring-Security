import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductStep } from './product-step.model';
import { ProductStepPopupService } from './product-step-popup.service';
import { ProductStepService } from './product-step.service';

@Component({
    selector: 'jhi-product-step-delete-dialog',
    templateUrl: './product-step-delete-dialog.component.html'
})
export class ProductStepDeleteDialogComponent {

    productStep: ProductStep;

    constructor(
        private productStepService: ProductStepService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productStepService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productStepListModification',
                content: 'Deleted an productStep'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-step-delete-popup',
    template: ''
})
export class ProductStepDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStepPopupService: ProductStepPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productStepPopupService
                .open(ProductStepDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
