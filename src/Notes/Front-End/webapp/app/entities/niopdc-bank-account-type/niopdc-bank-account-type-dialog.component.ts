import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NiopdcBankAccountType } from './niopdc-bank-account-type.model';
import { NiopdcBankAccountTypePopupService } from './niopdc-bank-account-type-popup.service';
import { NiopdcBankAccountTypeService } from './niopdc-bank-account-type.service';

@Component({
    selector: 'jhi-niopdc-bank-account-type-dialog',
    templateUrl: './niopdc-bank-account-type-dialog.component.html'
})
export class NiopdcBankAccountTypeDialogComponent implements OnInit {

    niopdcBankAccountType: NiopdcBankAccountType;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.niopdcBankAccountType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.niopdcBankAccountTypeService.update(this.niopdcBankAccountType));
        } else {
            this.subscribeToSaveResponse(
                this.niopdcBankAccountTypeService.create(this.niopdcBankAccountType));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<NiopdcBankAccountType>>) {
        result.subscribe((res: HttpResponse<NiopdcBankAccountType>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: NiopdcBankAccountType) {
        this.eventManager.broadcast({ name: 'niopdcBankAccountTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-niopdc-bank-account-type-popup',
    template: ''
})
export class NiopdcBankAccountTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcBankAccountTypePopupService: NiopdcBankAccountTypePopupService
) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.niopdcBankAccountTypePopupService
                    .open(NiopdcBankAccountTypeDialogComponent as Component, params['id']);
            } else {
                this.niopdcBankAccountTypePopupService
                    .open(NiopdcBankAccountTypeDialogComponent as Component);
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
