import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {LogBook} from './log-book.model';
import {LogBookService} from './log-book.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LogBookPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private logBookService: LogBookService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.logBookService.find(id).subscribe(logBook => {
                    this.ngbModalRef = this.logBookModalRef(component, logBook.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const logBook = new LogBook();
                    logBook.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.logBookModalRef(component, logBook);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    logBookModalRef(component: Component, logBook: LogBook): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.logBook = logBook;
        modalRef.result.then(result => {
            this.closeModal(logBook);
        },reason => {
            this.closeModal(logBook);
        });
        return modalRef;
    }

    closeModal(logBook) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
