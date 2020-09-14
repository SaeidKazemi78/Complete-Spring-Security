import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ParentBaseTestResult} from './parent-base-test-result.model';
import {ParentBaseTestResultService} from './parent-base-test-result.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ParentBaseTestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private parentBaseTestResultService: ParentBaseTestResultService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.parentBaseTestResultService.find(id).subscribe(parentBaseTestResultResponse => {
                    const parentBaseTestResult: ParentBaseTestResult = parentBaseTestResultResponse.body;
                    this.ngbModalRef = this.parentBaseTestResultModalRef(component, parentBaseTestResult);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const parentBaseTestResult = new ParentBaseTestResult();
                    this.ngbModalRef = this.parentBaseTestResultModalRef(component, parentBaseTestResult);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    parentBaseTestResultModalRef(component: Component, parentBaseTestResult: ParentBaseTestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.parentBaseTestResult = parentBaseTestResult;
        modalRef.result.then(result => {
            this.closeModal(parentBaseTestResult);
        },reason => {
            this.closeModal(parentBaseTestResult);
        });
        return modalRef;
    }

    closeModal(parentBaseTestResult) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
