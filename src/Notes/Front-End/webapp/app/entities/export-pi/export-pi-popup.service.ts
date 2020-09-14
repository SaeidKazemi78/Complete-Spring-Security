import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ExportPi} from './export-pi.model';
import {ExportPiService} from './export-pi.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class ExportPiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private exportPiService: ExportPiService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, exportLetterId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.exportPiService.find(id).subscribe(exportPiResponse => {
                    const exportPi: ExportPi = exportPiResponse.body;
                    this.ngbModalRef = this.exportPiModalRef(component, exportPi);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const exportPi = new ExportPi();
                    exportPi.exportLetterId = exportLetterId;
                    exportPi.active = true;
                    this.ngbModalRef = this.exportPiModalRef(component, exportPi);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exportPiModalRef(component: Component, exportPi: ExportPi): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exportPi = exportPi;
        modalRef.result.then(result => {
            this.closeModal(exportPi);
        }, reason => {
            this.closeModal(exportPi);
        });
        return modalRef;
    }

    closeModal(exportPi) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
