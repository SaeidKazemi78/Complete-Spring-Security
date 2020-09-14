import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductGroup } from './product-group.model';
import { ProductGroupPopupService } from './product-group-popup.service';
import { ProductGroupService } from './product-group.service';

@Component({
    selector: 'jhi-product-group-delete-dialog',
    templateUrl: './product-group-delete-dialog.component.html'
})
export class ProductGroupDeleteDialogComponent {

    productGroup: ProductGroup;

    constructor(
        private productGroupService: ProductGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productGroupListModification',
                content: 'Deleted an productGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-group-delete-popup',
    template: ''
})
export class ProductGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productGroupPopupService: ProductGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productGroupPopupService
                .open(ProductGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
