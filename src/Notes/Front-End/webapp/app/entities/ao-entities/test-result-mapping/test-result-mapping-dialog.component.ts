import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TestResultMapping} from './test-result-mapping.model';
import {TestResultMappingPopupService} from './test-result-mapping-popup.service';
import {TestResultMappingService} from './test-result-mapping.service';
import {BaseTestResult, BaseTestResultService} from '../base-test-result/index';

@Component({
    selector: 'jhi-test-result-mapping-dialog',
    templateUrl: './test-result-mapping-dialog.component.html'
})
export class TestResultMappingDialogComponent implements OnInit {

    testResultMapping: TestResultMapping;
    isSaving: boolean;
    isView: boolean;
    basetestresults: any;

    basetestresult: BaseTestResult[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testResultMappingService: TestResultMappingService,
        private baseTestResultService: BaseTestResultService,
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
        if (this.testResultMapping.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testResultMappingService.update(this.testResultMapping));
        } else {
            this.subscribeToSaveResponse(
                this.testResultMappingService.create(this.testResultMapping));
        }
    }

    trackBaseTestResultById(index: number, item: BaseTestResult) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TestResultMapping>>) {
        result.subscribe((res: HttpResponse<TestResultMapping>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TestResultMapping) {
        this.eventManager.broadcast({name: 'testResultMappingListModification', content: 'OK'});
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
    selector: 'jhi-test-result-mapping-popup',
    template: ''
})
export class TestResultMappingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultMappingPopupService: TestResultMappingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.testResultMappingPopupService
                    .open(TestResultMappingDialogComponent as Component, params['id']);
            } else if (params['baseTestResultId']) {
                this.testResultMappingPopupService
                    .open(TestResultMappingDialogComponent as Component, null, params['baseTestResultId']);
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
