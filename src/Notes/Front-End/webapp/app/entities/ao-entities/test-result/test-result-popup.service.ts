import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TestResult} from './test-result.model';
import {TestResultService} from './test-result.service';
import {RequestFilterElement} from '../request-filter-element/request-filter-element.model';
import {RequestTestResultService} from '../request-test-result/index';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private testResultService: TestResultService,
        private requestTestResultService: RequestTestResultService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, requestTestResultId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.testResultService.find(id).subscribe(changeFilterElementResponse => {
                    const testResult: TestResult = changeFilterElementResponse.body;
                    this.ngbModalRef = this.testResultModalRef(component, testResult);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const testResult = new TestResult();
                    testResult.requestTestResultId = requestTestResultId;
                    this.requestTestResultService.find(requestTestResultId).subscribe(requestTestResultResponse => {
                        const requestTestResult: RequestFilterElement = requestTestResultResponse.body;
                        testResult.requestTestResult = requestTestResult;
                        if (testResult.requestTestResult.testResultId != null) {

                            this.testResultService.find(testResult.requestTestResult.testResultId).subscribe(testResultResponse => {
                                const testResult: TestResult = testResultResponse.body;
                                testResult.requestTestResult = requestTestResult;
                                this.ngbModalRef = this.testResultModalRef(component, testResult);
                                resolve(this.ngbModalRef);
                            });

                        } else {
                            this.ngbModalRef = this.testResultModalRef(component, testResult);
                            resolve(this.ngbModalRef);
                        }

                    });

                }, 0);
            }
        });
    }

    testResultModalRef(component: Component, testResult: TestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testResult = testResult;
        modalRef.result.then(result => {
            this.closeModal(testResult);
        },reason => {
            this.closeModal(testResult);
        });
        return modalRef;
    }

    closeModal(testResult) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
