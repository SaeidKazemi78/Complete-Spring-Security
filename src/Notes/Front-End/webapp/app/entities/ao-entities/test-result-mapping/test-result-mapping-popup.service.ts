import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TestResultMapping} from './test-result-mapping.model';
import {TestResultMappingService} from './test-result-mapping.service';

@Injectable({ providedIn: 'root' })
export class TestResultMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private testResultMappingService: TestResultMappingService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, baseTestResultId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.testResultMappingService.find(id).subscribe(testResultMappingResponse => {
                    const testResultMapping: TestResultMapping = testResultMappingResponse.body;
                    this.ngbModalRef = this.testResultMappingModalRef(component, testResultMapping);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const testResultMapping = new TestResultMapping();
                    testResultMapping.baseTestResultId = baseTestResultId;
                    this.ngbModalRef = this.testResultMappingModalRef(component, testResultMapping);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    testResultMappingModalRef(component: Component, testResultMapping: TestResultMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testResultMapping = testResultMapping;
        modalRef.result.then(result => {
            this.closeModal(testResultMapping);
        },reason => {
            this.closeModal(testResultMapping);
        });
        return modalRef;
    }

    closeModal(testResultMapping) {
        this.router.navigate(['test-result-mapping', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
