import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SixtyBaseInformation } from './sixty-base-information.model';
import { SixtyBaseInformationService } from './sixty-base-information.service';
import {getPath} from "app/core/router";

@Injectable()
export class SixtyBaseInformationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private sixtyBaseInformationService: SixtyBaseInformationService

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
                this.sixtyBaseInformationService.find(id).subscribe(sixtyBaseInformationResponse => {
                    const sixtyBaseInformation: SixtyBaseInformation = sixtyBaseInformationResponse.body;
                    this.ngbModalRef = this.sixtyBaseInformationModalRef(component, sixtyBaseInformation);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sixtyBaseInformation = new SixtyBaseInformation();
                    this.ngbModalRef = this.sixtyBaseInformationModalRef(component, sixtyBaseInformation);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sixtyBaseInformationModalRef(component: Component, sixtyBaseInformation: SixtyBaseInformation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sixtyBaseInformation = sixtyBaseInformation;
        modalRef.result.then(result => {
            this.closeModal();
        },reason => {
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
