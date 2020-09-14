import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {DepositIdentifier} from './deposit-identifier.model';
import {DepositIdentifierService} from './deposit-identifier.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class DepositIdentifierPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private depositIdentifierService: DepositIdentifierService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, locationId?: number | any, personId?: number | any, customerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                const depositIdentifier = new DepositIdentifier();
                depositIdentifier.locationId = locationId;
                depositIdentifier.personId = personId;
                depositIdentifier.customerId = customerId;

                this.ngbModalRef = this.depositIdentifierModalRef(component, depositIdentifier);
                resolve(this.ngbModalRef);
            }, 0);
        });
    }

    depositIdentifierModalRef(component: Component, depositIdentifier: DepositIdentifier): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.depositIdentifier = depositIdentifier;
        modalRef.result.then(result => {
            this.closeModal(depositIdentifier);
        },reason => {
            this.closeModal(depositIdentifier);
        });
        return modalRef;
    }

    closeModal(depositIdentifier) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'preserve'});
        this.ngbModalRef = null;
    }
}
