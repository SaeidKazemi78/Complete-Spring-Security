import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {NiopdcBankAccount} from './niopdc-bank-account.model';
import {NiopdcBankAccountPopupService} from './niopdc-bank-account-popup.service';
import {NiopdcBankAccountService} from './niopdc-bank-account.service';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {Bank} from '../payment';

@Component({
    selector: 'jhi-niopdc-bank-account-dialog',
    templateUrl: './niopdc-bank-account-dialog.component.html'
})
export class NiopdcBankAccountDialogComponent implements OnInit {

    Bank = Bank;

    niopdcBankAccount: NiopdcBankAccount;
    isSaving: boolean;
    isView: boolean;

    niopdcbankaccounttypes: NiopdcBankAccountType[];
    customBankAccountType: any[];
    selectedBankAccountType: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private niopdcBankAccountService: NiopdcBankAccountService,
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccounttypes = res.body;
                this.customBankAccountType = [];
                for (let i = 0; i < this.niopdcbankaccounttypes.length; i++) {
                    this.customBankAccountType.push({
                        value: this.niopdcbankaccounttypes[i].id,
                        label: this.niopdcbankaccounttypes[i].title
                    });
                }
                if (this.niopdcBankAccount.id) {
                    this.selectedBankAccountType = this.niopdcBankAccount.bankAccountTypes.map(value => value.id);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    onChangeNiopdcBankAccountType(data) {
        if (data) {
            this.selectedBankAccountType = data;
            this.niopdcBankAccount.bankAccountTypes = [];
            for (let i = 0; i < this.selectedBankAccountType.length; i++) {
                const bankType = this.niopdcbankaccounttypes.find(value => value.id === this.selectedBankAccountType[i]);
                if (bankType) {
                    this.niopdcBankAccount.bankAccountTypes.push(bankType);
                }
            }
        }
    }

    save() {
        this.isSaving = true;
        if (this.niopdcBankAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.niopdcBankAccountService.update(this.niopdcBankAccount));
        } else {
            this.subscribeToSaveResponse(
                this.niopdcBankAccountService.create(this.niopdcBankAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NiopdcBankAccount>>) {
        result.subscribe((res: HttpResponse<NiopdcBankAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NiopdcBankAccount) {
        this.eventManager.broadcast({name: 'niopdcBankAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNiopdcBankAccountTypeById(index: number, item: NiopdcBankAccountType) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-niopdc-bank-account-popup',
    template: ''
})
export class NiopdcBankAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcBankAccountPopupService: NiopdcBankAccountPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.niopdcBankAccountPopupService
                    .open(NiopdcBankAccountDialogComponent as Component, params['id']);
            } else {
                this.niopdcBankAccountPopupService
                    .open(NiopdcBankAccountDialogComponent as Component);
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
