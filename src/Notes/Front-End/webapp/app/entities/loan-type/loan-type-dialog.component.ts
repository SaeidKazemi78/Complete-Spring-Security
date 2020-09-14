import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {LoanType} from './loan-type.model';
import {LoanTypePopupService} from './loan-type-popup.service';
import {LoanTypeService} from './loan-type.service';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';

@Component({
    selector: 'jhi-loan-type-dialog',
    templateUrl: './loan-type-dialog.component.html'
})
export class LoanTypeDialogComponent implements OnInit {

    loanType: LoanType;
    isSaving: boolean;
    isView: boolean;
    niopdcbankaccounttypes: NiopdcBankAccountType[];

    constructor(
        public activeModal: NgbActiveModal,
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        private jhiAlertService: JhiAlertService,
        private loanTypeService: LoanTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccounttypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (!this.loanType.id) {
            this.loanType.startDate = new Date();
            this.loanType.finishDate = new Date();
            this.loanType.finishDate.setFullYear(this.loanType.finishDate.getFullYear() + 1);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.loanType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loanTypeService.update(this.loanType));
        } else {
            this.subscribeToSaveResponse(
                this.loanTypeService.create(this.loanType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LoanType>>) {
        result.subscribe((res: HttpResponse<LoanType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LoanType) {
        this.eventManager.broadcast({name: 'loanTypeListModification', content: 'OK'});
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
    selector: 'jhi-loan-type-popup',
    template: ''
})
export class LoanTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanTypePopupService: LoanTypePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.loanTypePopupService
                    .open(LoanTypeDialogComponent as Component, params['id']);
            } else {
                this.loanTypePopupService
                    .open(LoanTypeDialogComponent as Component);
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
