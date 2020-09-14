import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductUnit } from './product-unit.model';
import { ProductUnitPopupService } from './product-unit-popup.service';
import { ProductUnitService } from './product-unit.service';

@Component({
    selector: 'jhi-product-unit-delete-dialog',
    templateUrl: './product-unit-delete-dialog.component.html'
})
export class ProductUnitDeleteDialogComponent {

    productUnit: ProductUnit;

    constructor(
        private productUnitService: ProductUnitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productUnitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productUnitListModification',
                content: 'Deleted an productUnit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-unit-delete-popup',
    template: ''
})
export class ProductUnitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productUnitPopupService: ProductUnitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productUnitPopupService
                .open(ProductUnitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
