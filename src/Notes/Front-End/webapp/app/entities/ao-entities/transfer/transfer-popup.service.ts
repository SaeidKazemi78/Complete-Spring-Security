import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Transfer} from './transfer.model';
import {TransferService} from './transfer.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TransferPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private transferService: TransferService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.transferService.find(id).subscribe(transfer => {
                    this.ngbModalRef = this.transferModalRef(component, transfer.body);
                    resolve(this.ngbModalRef);
                });
            } else if (dayDepotId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const transfer = new Transfer();
                    transfer.dayDepotId = Number(dayDepotId);
                    transfer.fromDayDepotId = Number(dayDepotId);
                    this.ngbModalRef = this.transferModalRef(component, transfer);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                setTimeout(() => {
                    const transfer = new Transfer();
                    this.ngbModalRef = this.transferModalRef(component, transfer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transferModalRef(component: Component, transfer: Transfer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transfer = transfer;
        modalRef.result.then(result => {
            this.closeModal(transfer);
        },reason => {
            this.closeModal(transfer);
        });
        return modalRef;
    }

    closeModal(transfer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
