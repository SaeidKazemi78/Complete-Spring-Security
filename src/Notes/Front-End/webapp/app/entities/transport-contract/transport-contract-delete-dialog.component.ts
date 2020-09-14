import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransportContract } from './transport-contract.model';
import { TransportContractPopupService } from './transport-contract-popup.service';
import { TransportContractService } from './transport-contract.service';

@Component({
    selector: 'jhi-transport-contract-delete-dialog',
    templateUrl: './transport-contract-delete-dialog.component.html'
})
export class TransportContractDeleteDialogComponent {

    transportContract: TransportContract;

    constructor(
        private transportContractService: TransportContractService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportContractService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportContractListModification',
                content: 'Deleted an transportContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transport-contract-delete-popup',
    template: ''
})
export class TransportContractDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transportContractPopupService: TransportContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.transportContractPopupService
                .open(TransportContractDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
