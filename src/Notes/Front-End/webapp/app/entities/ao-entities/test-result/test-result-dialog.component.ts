import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TestResult} from './test-result.model';
import {TestResultPopupService} from './test-result-popup.service';
import {TestResultService} from './test-result.service';
import {RequestTestResult, RequestTestResultService} from '../request-test-result/index';
import {ParentBaseTestResult, ParentBaseTestResultService} from '../parent-base-test-result/index';
import {BaseTestResultService} from '../base-test-result/index';
import {TestResultMapping} from '../test-result-mapping';

@Component({
    selector: 'jhi-test-result-dialog',
    templateUrl: './test-result-dialog.component.html'
})
export class TestResultDialogComponent implements OnInit {

    testResult: TestResult;
    isSaving: boolean;
    isView: boolean;
    requesttestresult: RequestTestResult[];

    parentbasetestresult: ParentBaseTestResult[];
    mode: string;
    baseTestResultType: any;
    predicate: any;
    reverse: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testResultService: TestResultService,
        private requestTestResultService: RequestTestResultService,
        private parentBaseTestResultService: ParentBaseTestResultService,
        private baseTestResultService: BaseTestResultService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.mode = Mode.mode;
        this.isSaving = false;

        if (this.testResult.id != null) {
            this.baseTestResultService.queryByProduct(this.testResult.requestTestResult.productId, this.testResult.requestTestResult.testResultType).subscribe(value => {
                value.body.forEach(value1 => {
                    this.baseTestResultType = value1.parentBaseTestResultType;
                    console.log(this.baseTestResultType);
                });
            });
        } else {
            this.testResult.testResultMappings = [];
            this.baseTestResultService.queryByProduct(this.testResult.requestTestResult.productId, this.testResult.requestTestResult.testResultType).subscribe(value => {
                value.body.forEach(value1 => {
                    const testResultMapping = new TestResultMapping();
                    testResultMapping.baseTestResultId = value1.id;
                    testResultMapping.ip = value1.ip;
                    testResultMapping.property = value1.property;
                    testResultMapping.specification = value1.specification;
                    testResultMapping.astm = value1.astm;
                    this.baseTestResultType = value1.parentBaseTestResultType;
                    this.testResult.testResultMappings.push(testResultMapping);
                });
            });
        }
        /* this.requestTestResultService.query()
             .subscribe((res: HttpResponse<RequestTestResult[]>) => { this.requesttestresult = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
         this.parentBaseTestResultService.query()
             .subscribe((res: HttpResponse<ParentBaseTestResult[]>) => { this.parentbasetestresult = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testResultService.update(this.testResult));
        } else {
            this.subscribeToSaveResponse(
                this.testResultService.create(this.testResult));
        }
    }

    confirm() {
        this.subscribeToSaveResponse(this.testResultService.confirm(this.testResult.id));
    }

    send() {
        this.subscribeToSaveResponse(this.testResultService.send(this.testResult.id));
    }

    trackRequestTestResultById(index: number, item: RequestTestResult) {
        return item.id;
    }

    trackParentBaseTestResultById(index: number, item: ParentBaseTestResult) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TestResult>>) {
        result.subscribe((res: HttpResponse<TestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TestResult) {
        this.eventManager.broadcast({name: 'testResultListModification', content: 'OK'});
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
    selector: 'jhi-test-result-popup',
    template: ''
})
export class TestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultPopupService: TestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            Mode.mode = params['mode'];

            if (params['id']) {
                this.testResultPopupService
                    .open(TestResultDialogComponent as Component, params['id']);
            } else if (params['requestTestResultId']) {
                this.testResultPopupService
                    .open(TestResultDialogComponent as Component, null, params['requestTestResultId']);
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

class Mode {
    static mode: string;
}
