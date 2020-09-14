import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SellContract } from './sell-contract.model';
import { SellContractPopupService } from './sell-contract-popup.service';
import { SellContractService } from './sell-contract.service';

@Component({
    selector: 'jhi-sell-contract-delete-dialog',
    templateUrl: './sell-contract-delete-dialog.component.html'
})
export class SellContractDeleteDialogComponent {

    sellContract: SellContract;

    constructor(
        private sellContractService: SellContractService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellContractService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellContractListModification',
                content: 'Deleted an sellContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-contract-delete-popup',
    template: ''
})
export class SellContractDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractPopupService: SellContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sellContractPopupService
                .open(SellContractDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
