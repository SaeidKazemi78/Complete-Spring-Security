import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {AccountNumberItems} from './account-number-items.model';
import {AccountNumberItemsPopupService} from './account-number-items-popup.service';
import {AccountNumberItemsService} from './account-number-items.service';

@Component({
    selector: 'jhi-account-number-items-dialog',
    templateUrl: './account-number-items-dialog.component.html'
})
export class AccountNumberItemsDialogComponent implements OnInit {

    accountNumberItems: AccountNumberItems;
    isSaving: boolean;
    isView: boolean;
    maxLength: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accountNumberItemsService: AccountNumberItemsService,
        private eventManager: JhiEventManager
    ) {
    }

    onChangePart(value) {
        if (value == 'PART3') {
            this.maxLength = 5;
        } else if (value == 'PART4') {
            this.maxLength = 4;
        } else {
            this.maxLength = 3;
        }
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.accountNumberItems.id) {
            this.onChangePart(this.accountNumberItems.part);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accountNumberItems.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountNumberItemsService.update(this.accountNumberItems));
        } else {
            this.subscribeToSaveResponse(
                this.accountNumberItemsService.create(this.accountNumberItems));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AccountNumberItems>>) {
        result.subscribe((res: HttpResponse<AccountNumberItems>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountNumberItems) {
        this.eventManager.broadcast({name: 'accountNumberItemsListModification', content: 'OK'});
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
    selector: 'jhi-account-number-items-popup',
    template: ''
})
export class AccountNumberItemsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountNumberItemsPopupService: AccountNumberItemsPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.accountNumberItemsPopupService
                    .open(AccountNumberItemsDialogComponent as Component, params['id']);
            } else {
                this.accountNumberItemsPopupService
                    .open(AccountNumberItemsDialogComponent as Component);
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
