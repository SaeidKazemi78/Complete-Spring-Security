import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {MainDayOperation} from './main-day-operation.model';
import {MainDayOperationService} from './main-day-operation.service';

@Injectable({ providedIn: 'root' })
export class MainDayOperationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private mainDayOperationService: MainDayOperationService
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
                this.mainDayOperationService.find(id).subscribe(mainDayOperation => {
                    this.ngbModalRef = this.mainDayOperationModalRef(component, mainDayOperation.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const mainDayOperation = new MainDayOperation();
                    mainDayOperation.day = Date.now();
                    this.ngbModalRef = this.mainDayOperationModalRef(component, mainDayOperation);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mainDayOperationModalRef(component: Component, mainDayOperation: MainDayOperation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mainDayOperation = mainDayOperation;
        modalRef.result.then(result => {
            this.closeModal(mainDayOperation);
        },reason => {
            this.closeModal(mainDayOperation);
        });
        return modalRef;
    }

    closeModal(mainDayOperation) {
        this.router.navigate(['main-day-operation', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
