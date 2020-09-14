import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {WayBill} from './way-bill.model';
import {WayBillService} from './way-bill.service';
import {getPath} from "app/core/router";

@Injectable({ providedIn: 'root' })
export class WayBillPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private wayBillService: WayBillService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, dayDepotId?: number | any, orderId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.wayBillService.find(id).subscribe(wayBillResponse => {
                    const wayBill: WayBill = wayBillResponse.body;
                    this.ngbModalRef = this.wayBillModalRef(component, wayBill);
                    resolve(this.ngbModalRef);
                });
            } else if (dayDepotId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const wayBill = new WayBill();
                    wayBill.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.wayBillModalRef(component, wayBill);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                setTimeout(() => {
                    const wayBill = new WayBill();
                    wayBill.orderId = orderId;
                    this.ngbModalRef = this.wayBillModalRef(component, wayBill);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    wayBillModalRef(component: Component, wayBill: WayBill): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wayBill = wayBill;
        modalRef.result.then(result => {
            this.closeModal(wayBill);
        },reason => {
            this.closeModal(wayBill);
        });
        return modalRef;
    }

    closeModal(wayBill) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
