import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {SendProduct} from './send-product.model';
import {SendProductPopupService} from './send-product-popup.service';
import {SendProductService} from './send-product.service';

@Component({
    selector: 'jhi-send-product-delete-dialog',
    templateUrl: './send-product-delete-dialog.component.html'
})
export class SendProductDeleteDialogComponent {

    sendProduct: SendProduct;

    constructor(
        private sendProductService: SendProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sendProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sendProductListModification',
                content: 'Deleted an sendProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-send-product-delete-popup',
    template: ''
})
export class SendProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sendProductPopupService: SendProductPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sendProductPopupService
                .open(SendProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
