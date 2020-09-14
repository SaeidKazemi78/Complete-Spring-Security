import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {TransportContract} from './transport-contract.model';
import {TransportContractService} from './transport-contract.service';

@Injectable({ providedIn: 'root' })
export class TransportContractPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private transportContractService: TransportContractService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.transportContractService.find(id).subscribe(transportContract => {
                    this.ngbModalRef = this.transportContractModalRef(component, transportContract.body);
                    resolve(this.ngbModalRef);
                });
            } else if (customerId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const transportContract = new TransportContract();
                    transportContract.customerId = customerId;
                    this.ngbModalRef = this.transportContractModalRef(component, transportContract);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transportContractModalRef(component: Component, transportContract: TransportContract): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transportContract = transportContract;
        modalRef.result.then(result => {
            this.closeModal(transportContract);
        }, reason => {
            this.closeModal(transportContract);
        });
        return modalRef;
    }

    closeModal(transportContract) {
        this.router.navigate([(transportContract.customerId ? 'customer/' + transportContract.customerId + '/transport-contract' : 'transport-contract'), { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
