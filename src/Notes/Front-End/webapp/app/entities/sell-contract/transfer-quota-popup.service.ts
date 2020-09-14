import {Component, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {TransferQuota} from './sell-contract.model';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TransferQuotaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                const transferQuota = new TransferQuota();
                transferQuota.sellContractId = Number(id);
                this.ngbModalRef = this.transferQuotaModalRef(component, transferQuota);
                resolve(this.ngbModalRef);
            }, 0);

        });
    }

    transferQuotaModalRef(component: Component, transferQuota: TransferQuota): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transferQuota = transferQuota;
        modalRef.result.then(result => {
            this.closeModal(transferQuota);
        },reason => {
            this.closeModal(transferQuota);
        });
        return modalRef;
    }

    closeModal(transferQuota) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
