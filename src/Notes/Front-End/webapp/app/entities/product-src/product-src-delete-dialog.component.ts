import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductSrc } from './product-src.model';
import { ProductSrcPopupService } from './product-src-popup.service';
import { ProductSrcService } from './product-src.service';

@Component({
    selector: 'jhi-product-src-delete-dialog',
    templateUrl: './product-src-delete-dialog.component.html'
})
export class ProductSrcDeleteDialogComponent {

    productSrc: ProductSrc;

    constructor(
        private productSrcService: ProductSrcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productSrcService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productSrcListModification',
                content: 'Deleted an productSrc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-src-delete-popup',
    template: ''
})
export class ProductSrcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productSrcPopupService: ProductSrcPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.productSrcPopupService
                .open(ProductSrcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
