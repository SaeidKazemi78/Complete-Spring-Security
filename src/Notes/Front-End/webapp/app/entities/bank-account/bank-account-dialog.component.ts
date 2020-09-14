import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {BankAccount} from './bank-account.model';
import {BankAccountPopupService} from './bank-account-popup.service';
import {BankAccountService} from './bank-account.service';
import {Bank, BankService} from '../bank';

@Component({
    selector: 'jhi-bank-account-dialog',
    templateUrl: './bank-account-dialog.component.html'
})
export class BankAccountDialogComponent implements OnInit {

    bankAccount: BankAccount;
    isSaving: boolean;
    isView: boolean;

    banks: Bank[];
    shabaNumberPattern = /^[Ii][Rr][0-9]{23}$/;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bankAccountService: BankAccountService,
        private bankService: BankService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.bankService.query()
            .subscribe((res: HttpResponse<Bank[]>) => {
                this.banks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankAccountService.update(this.bankAccount));
        } else {
            this.subscribeToSaveResponse(
                this.bankAccountService.create(this.bankAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankAccount>>) {
        result.subscribe((res: HttpResponse<BankAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankAccount) {
        this.eventManager.broadcast({name: 'bankAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bank-account-popup',
    template: ''
})
export class BankAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.bankAccountPopupService
                    .open(BankAccountDialogComponent as Component, params['id']);
            } else if (params['personId']) {
                this.bankAccountPopupService
                    .open(BankAccountDialogComponent as Component, null, params['personId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
