import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {BaseTestResult} from './base-test-result.model';
import {BaseTestResultService} from './base-test-result.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BaseTestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private baseTestResultService: BaseTestResultService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, parentBaseTestResultId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.baseTestResultService.find(id).subscribe(baseTestResultResponse => {
                    const baseTestResult: BaseTestResult = baseTestResultResponse.body;
                    this.ngbModalRef = this.baseTestResultModalRef(component, baseTestResult);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const baseTestResult = new BaseTestResult();
                    baseTestResult.parentBaseTestResultId = parentBaseTestResultId;
                    this.ngbModalRef = this.baseTestResultModalRef(component, baseTestResult);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    baseTestResultModalRef(component: Component, baseTestResult: BaseTestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.baseTestResult = baseTestResult;
        modalRef.result.then(result => {
            this.closeModal(baseTestResult);
        },reason => {
            this.closeModal(baseTestResult);
        });
        return modalRef;
    }

    closeModal(baseTestResult) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
