import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {TransferPlatformToUnitService} from './transfer-platform-to-unit.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TransferPlatformToUnitPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private transferPlatformToUnitService: TransferPlatformToUnitService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, platformId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.transferPlatformToUnitService.find(id).subscribe(transferPlatformToUnit => {
                    this.ngbModalRef = this.transferPlatformToUnitModalRef(component, transferPlatformToUnit.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const transferPlatformToUnit = new TransferPlatformToUnit();
                    transferPlatformToUnit.platformId = platformId;
                    this.ngbModalRef = this.transferPlatformToUnitModalRef(component, transferPlatformToUnit);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transferPlatformToUnitModalRef(component: Component, transferPlatformToUnit: TransferPlatformToUnit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transferPlatformToUnit = transferPlatformToUnit;
        modalRef.result.then(result => {
            this.closeModal(transferPlatformToUnit);
        },reason => {
            this.closeModal(transferPlatformToUnit);
        });
        return modalRef;
    }

    closeModal(transferPlatformToUnit) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
