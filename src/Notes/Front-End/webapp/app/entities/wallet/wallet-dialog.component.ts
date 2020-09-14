import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Wallet } from './wallet.model';
import { WalletPopupService } from './wallet-popup.service';
import { WalletService } from './wallet.service';

@Component({
    selector: 'jhi-wallet-dialog',
    templateUrl: './wallet-dialog.component.html'
})
export class WalletDialogComponent implements OnInit {

    wallet: Wallet;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private walletService: WalletService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.wallet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.walletService.update(this.wallet));
        } else {
            this.subscribeToSaveResponse(
                this.walletService.create(this.wallet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Wallet>>) {
        result.subscribe((res: HttpResponse<Wallet>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Wallet) {
        this.eventManager.broadcast({ name: 'walletListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-wallet-popup',
    template: ''
})
export class WalletPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private walletPopupService: WalletPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.walletPopupService
                    .open(WalletDialogComponent as Component, params['id']);
            } else {
                this.walletPopupService
                    .open(WalletDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
