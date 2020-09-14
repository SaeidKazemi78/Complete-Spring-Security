import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ReceivedProduct} from './received-product.model';
import {ReceivedProductPopupService} from './received-product-popup.service';
import {ReceivedProductService} from './received-product.service';

@Component({
    selector: 'jhi-received-product-delete-dialog',
    templateUrl: './received-product-delete-dialog.component.html'
})
export class ReceivedProductDeleteDialogComponent {

    receivedProduct: ReceivedProduct;

    constructor(
        private receivedProductService: ReceivedProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receivedProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receivedProductListModification',
                content: 'Deleted an receivedProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-received-product-delete-popup',
    template: ''
})
export class ReceivedProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private receivedProductPopupService: ReceivedProductPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.receivedProductPopupService
                .open(ReceivedProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
