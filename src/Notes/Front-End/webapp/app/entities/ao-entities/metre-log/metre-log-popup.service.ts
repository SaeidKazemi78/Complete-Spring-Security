import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MetreLog} from './metre-log.model';
import {MetreLogService} from './metre-log.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class MetreLogPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private metreLogService: MetreLogService
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
                this.metreLogService.find(id)
                    .subscribe((metreLogResponse: HttpResponse<MetreLog>) => {
                        const metreLog: MetreLog = metreLogResponse.body;
                        this.ngbModalRef = this.metreLogModalRef(component, metreLog);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.metreLogModalRef(component, new MetreLog());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    metreLogModalRef(component: Component, metreLog: MetreLog): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.metreLog = metreLog;
        modalRef.result.then(result => {
            this.closeModal(metreLog);
        },reason => {
            this.closeModal(metreLog);
        });
        return modalRef;
    }

    closeModal(metreLog) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
