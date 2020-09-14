import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ShiftWorkService} from './shift-work.service';
import {getPath, PathRouter} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ShiftWorkPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, parentId?: number | any, mode?: any, type?: any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.ngbModalRef = this.shiftWorkModalRef(component, id, parentId, mode, type);
                resolve(this.ngbModalRef);
            }, 0);

        });
    }

    shiftWorkModalRef(component: Component, id: number, parentId: number, mode: any, type: any): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});

        if (!type) {
            modalRef.componentInstance.id = id;
            modalRef.componentInstance.locationId = parentId;
        } else {
            modalRef.componentInstance.refuelCenterId = id;
            modalRef.componentInstance.shiftType = type;
        }
        modalRef.componentInstance.mode = mode;
        modalRef.result.then(result => {
            this.closeModal();
        }, reason => {
            this.closeModal();
        });
        return modalRef;
    }

    closeModal() {
        const path = getPath(this.router, '/');
        this.router.navigate([...path.pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParams: path.queryParams});
        this.ngbModalRef = null;
    }
}
