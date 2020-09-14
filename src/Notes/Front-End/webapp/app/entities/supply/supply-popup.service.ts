import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Supply} from './supply.model';
import {SupplyService} from './supply.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SupplyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private supplyService: SupplyService

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
                this.supplyService.find(id).subscribe((supplyResponse) => {
                    const supply: Supply = supplyResponse.body;
                    this.ngbModalRef = this.supplyModalRef(component, supply);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const supply = new Supply();
                    this.ngbModalRef = this.supplyModalRef(component, supply);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyModalRef(component: Component, supply: Supply): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supply = supply;
        modalRef.result.then((result) => {
            this.closeModal();

        }, (reason) => {
            this.closeModal();

        });
        return modalRef;
    }

    closeModal() {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
