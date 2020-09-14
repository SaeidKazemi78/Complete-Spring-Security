import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ActionLogMapping} from './action-log-mapping.model';
import {ActionLogMappingService} from './action-log-mapping.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class ActionLogMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private actionLogService: ActionLogMappingService
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
                this.actionLogService.find(id).subscribe(actionLog => {
                    this.ngbModalRef = this.actionLogModalRef(component, actionLog.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const actionLog = new ActionLogMapping();
                    this.ngbModalRef = this.actionLogModalRef(component, actionLog);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    actionLogModalRef(component: Component, actionLog: ActionLogMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.actionLogMapping = actionLog;
        modalRef.result.then(result => {
            this.closeModal(actionLog);
        }, reason => {
            this.closeModal(actionLog);
        });
        return modalRef;
    }

    closeModal(actionLog) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
