import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {TransportContract} from './transport-contract.model';
import {TransportContractService} from './transport-contract.service';
import {TransportContractPopupService} from './transport-contract-popup.service';

@Component({
    selector: 'jhi-transport-contract-confirm-dialog',
    templateUrl: './transport-contract-confirm-dialog.component.html'
})
export class TransportContractConfirmDialogComponent implements OnInit {

    transportContract: TransportContract;
    confirmMode: boolean;

    constructor(
        private transportContractService: TransportContractService,
        public activeModal: NgbActiveModal,
        public route: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.confirmMode = View.confirm;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm(id: number) {
        if (this.transportContract) {
            if (this.transportContract.confirm == null || this.transportContract.confirm === false) {
                this.transportContractService.confirm(id).subscribe(c => {
                    this.eventManager.broadcast({
                        name: 'transportContractListModification',
                        content: 'confirmed an transportContract'
                    });
                    this.activeModal.dismiss(true);
                    });
            } else {
                this.transportContractService.revertConfirm(id).subscribe(c => {
                    this.eventManager.broadcast({
                        name: 'transportContractListModification',
                        content: 'confirmed an transportContract'
                    });
                    this.activeModal.dismiss(true);
                });
            }

        }
    }
}

@Component({
    selector: 'jhi-transport-contract-confirm-popup',
    template: ''
})
export class TransportContractConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transportContractPopupService: TransportContractPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.queryParams.subscribe(params => {
            View.confirm = params['mode'] === 'confirm';
        });
        this.routeSub = this.route.params.subscribe((params) => {
            this.transportContractPopupService
                .open(TransportContractConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static confirm: boolean;
}
