import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ExportLetter } from './export-letter.model';
import { ExportLetterService } from './export-letter.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class ExportLetterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private exportLetterService: ExportLetterService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, sellContractId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.exportLetterService.find(id).subscribe(exportLetterResponse => {
                    const exportLetter: ExportLetter = exportLetterResponse.body;
                    this.ngbModalRef = this.exportLetterModalRef(component, exportLetter);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const exportLetter = new ExportLetter();
                    exportLetter.sellContractId = sellContractId;
                    this.ngbModalRef = this.exportLetterModalRef(component, exportLetter);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exportLetterModalRef(component: Component, exportLetter: ExportLetter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exportLetter = exportLetter;
        modalRef.result.then(result => {
            this.closeModal(exportLetter);
        }, reason => {
            this.closeModal(exportLetter);
        });
        return modalRef;
    }
    closeModal(exportLetter) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
