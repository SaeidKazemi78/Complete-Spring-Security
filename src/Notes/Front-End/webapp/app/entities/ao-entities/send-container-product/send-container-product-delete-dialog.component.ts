import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {SendContainerProduct} from './send-container-product.model';
import {SendContainerProductPopupService} from './send-container-product-popup.service';
import {SendContainerProductService} from './send-container-product.service';

@Component({
    selector: 'jhi-send-container-product-delete-dialog',
    templateUrl: './send-container-product-delete-dialog.component.html'
})
export class SendContainerProductDeleteDialogComponent {

    sendContainerProduct: SendContainerProduct;

    constructor(
        private sendContainerProductService: SendContainerProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sendContainerProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sendContainerProductListModification',
                content: 'Deleted an sendContainerProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-send-container-product-delete-popup',
    template: ''
})
export class SendContainerProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sendContainerProductPopupService: SendContainerProductPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sendContainerProductPopupService
                .open(SendContainerProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
