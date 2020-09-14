import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Wallet } from './wallet.model';
import { WalletPopupService } from './wallet-popup.service';
import { WalletService } from './wallet.service';

@Component({
    selector: 'jhi-wallet-delete-dialog',
    templateUrl: './wallet-delete-dialog.component.html'
})
export class WalletDeleteDialogComponent {

    wallet: Wallet;

    constructor(
        private walletService: WalletService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.walletService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'walletListModification',
                content: 'Deleted an wallet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wallet-delete-popup',
    template: ''
})
export class WalletDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private walletPopupService: WalletPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.walletPopupService
                .open(WalletDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
