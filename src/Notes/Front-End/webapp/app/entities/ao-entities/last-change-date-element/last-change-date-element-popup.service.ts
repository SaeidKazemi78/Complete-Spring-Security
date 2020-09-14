import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {LastChangeDateElement} from './last-change-date-element.model';
import {LastChangeDateElementService} from './last-change-date-element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LastChangeDateElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private lastChangeDateElementService: LastChangeDateElementService
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
                this.lastChangeDateElementService.find(id)
                    .subscribe((lastChangeDateElementResponse: HttpResponse<LastChangeDateElement>) => {
                        const lastChangeDateElement: LastChangeDateElement = lastChangeDateElementResponse.body;
                        lastChangeDateElement.lastChangeDate = this.datePipe
                            .transform(lastChangeDateElement.lastChangeDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.lastChangeDateElementModalRef(component, lastChangeDateElement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lastChangeDateElementModalRef(component, new LastChangeDateElement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lastChangeDateElementModalRef(component: Component, lastChangeDateElement: LastChangeDateElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lastChangeDateElement = lastChangeDateElement;
        modalRef.result.then(result => {
            this.closeModal(lastChangeDateElement);
        },reason => {
            this.closeModal(lastChangeDateElement);
        });
        return modalRef;
    }

    closeModal(lastChangeDateElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
