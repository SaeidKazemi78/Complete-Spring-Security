import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BaseTestResult} from './base-test-result.model';
import {BaseTestResultPopupService} from './base-test-result-popup.service';
import {BaseTestResultService} from './base-test-result.service';
import {ParentBaseTestResult, ParentBaseTestResultService} from '../parent-base-test-result';

@Component({
    selector: 'jhi-base-test-result-dialog',
    templateUrl: './base-test-result-dialog.component.html'
})
export class BaseTestResultDialogComponent implements OnInit {

    baseTestResult: BaseTestResult;
    isSaving: boolean;
    isView: boolean;
    parentbasetestresult: ParentBaseTestResult;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private baseTestResultService: BaseTestResultService,
        private parentBaseTestResultService: ParentBaseTestResultService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.parentbasetestresult = new ParentBaseTestResult();
        this.parentBaseTestResultService.find(this.baseTestResult.parentBaseTestResultId)
            .subscribe(res => {
                this.parentbasetestresult = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.baseTestResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baseTestResultService.update(this.baseTestResult));
        } else {
            this.subscribeToSaveResponse(
                this.baseTestResultService.create(this.baseTestResult));
        }
    }

    trackParentBaseTestResultById(index: number, item: ParentBaseTestResult) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaseTestResult>>) {
        result.subscribe((res: HttpResponse<BaseTestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaseTestResult) {
        this.eventManager.broadcast({name: 'baseTestResultListModification', content: 'OK'});
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
    selector: 'jhi-base-test-result-popup',
    template: ''
})
export class BaseTestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseTestResultPopupService: BaseTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.baseTestResultPopupService
                    .open(BaseTestResultDialogComponent as Component, params['id']);
            } else if (params['parentBaseTestResultId']) {
                this.baseTestResultPopupService
                    .open(BaseTestResultDialogComponent as Component, null, params['parentBaseTestResultId']);
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
