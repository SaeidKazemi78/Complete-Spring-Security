import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultService} from './request-test-result.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class RequestTestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private requestTestResultService: RequestTestResultService
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
                this.requestTestResultService.find(id).subscribe(requestTestResultResponse => {
                    const requestTestResult: RequestTestResult = requestTestResultResponse.body;
                    this.ngbModalRef = this.requestTestResultModalRef(component, requestTestResult);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const requestTestResult = new RequestTestResult();
                    this.ngbModalRef = this.requestTestResultModalRef(component, requestTestResult);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestTestResultModalRef(component: Component, requestTestResult: RequestTestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestTestResult = requestTestResult;
        modalRef.result.then(result => {
            this.closeModal(requestTestResult);
        },reason => {
            this.closeModal(requestTestResult);
        });
        return modalRef;
    }

    closeModal(requestTestResult) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
