import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {AccountNumberFormat} from './account-number-format.model';
import {AccountNumberFormatPopupService} from './account-number-format-popup.service';
import {AccountNumberFormatService} from './account-number-format.service';
import {AccountNumberItems, AccountNumberItemsService} from '../account-number-items';
import {ProductGroup} from '../product-group';

@Component({
    selector: 'jhi-account-number-format-dialog',
    templateUrl: './account-number-format-dialog.component.html'
})
export class AccountNumberFormatDialogComponent implements OnInit {

    accountNumberFormat: AccountNumberFormat;
    isSaving: boolean;
    isView: boolean;
    accountNumberItem
        : AccountNumberItems[];
    itemPart1: AccountNumberItems[];
    itemPart2: AccountNumberItems[];
    itemPart3: AccountNumberItems[];
    itemPart4: AccountNumberItems[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accountNumberFormatService: AccountNumberFormatService,
        private eventManager: JhiEventManager,
        private accountNumberItemsService: AccountNumberItemsService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.accountNumberItemsService.query().subscribe((res: HttpResponse<AccountNumberItems[]>) => {
            this.accountNumberItem = res.body;
            if (this.accountNumberItem.length != 0) {
                this.itemPart1 = this.accountNumberItem.filter(value => value.part === 'PART1');
                this.itemPart2 = this.accountNumberItem.filter(value => value.part === 'PART2');
                this.itemPart3 = this.accountNumberItem.filter(value => value.part === 'PART3');
                this.itemPart4 = this.accountNumberItem.filter(value => value.part === 'PART4');
            }
        }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accountNumberFormat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountNumberFormatService.update(this.accountNumberFormat));
        } else {
            this.subscribeToSaveResponse(
                this.accountNumberFormatService.create(this.accountNumberFormat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AccountNumberFormat>>) {
        result.subscribe((res: HttpResponse<AccountNumberFormat>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountNumberFormat) {
        this.eventManager.broadcast({name: 'accountNumberFormatListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    trackAccountNumber(index: number, item: AccountNumberItems) {
        return item.content;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

     partChanges() {
        if (this.accountNumberFormat.part1 != undefined && this.accountNumberFormat.part2 != undefined && this.accountNumberFormat.part3 != undefined && this.accountNumberFormat.part4 != undefined) {
            this.accountNumberFormat.format = this.accountNumberFormat.part1 + this.accountNumberFormat.part2 + this.accountNumberFormat.part3
                + this.accountNumberFormat.part4;
        }
    }
}

@Component({
    selector: 'jhi-account-number-format-popup',
    template: ''
})
export class AccountNumberFormatPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountNumberFormatPopupService: AccountNumberFormatPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.accountNumberFormatPopupService
                    .open(AccountNumberFormatDialogComponent as Component, params['id']);
            } else {
                this.accountNumberFormatPopupService
                    .open(AccountNumberFormatDialogComponent as Component);
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
