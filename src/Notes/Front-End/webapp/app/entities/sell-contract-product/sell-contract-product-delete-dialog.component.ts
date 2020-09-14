import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SellContractProduct } from './sell-contract-product.model';
import { SellContractProductPopupService } from './sell-contract-product-popup.service';
import { SellContractProductService } from './sell-contract-product.service';

@Component({
    selector: 'jhi-sell-contract-product-delete-dialog',
    templateUrl: './sell-contract-product-delete-dialog.component.html'
})
export class SellContractProductDeleteDialogComponent {

    sellContractProduct: SellContractProduct;

    constructor(
        private sellContractProductService: SellContractProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellContractProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellContractProductListModification',
                content: 'Deleted an sellContractProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-contract-product-delete-popup',
    template: ''
})
export class SellContractProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractProductPopupService: SellContractProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sellContractProductPopupService
                .open(SellContractProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
