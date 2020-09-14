import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {SellGroundFuel} from './sell-ground-fuel.model';
import {SellGroundFuelService} from './sell-ground-fuel.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class SellGroundFuelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sellGroundFuelService: SellGroundFuelService
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
                this.sellGroundFuelService.find(id)
                    .subscribe((sellGroundFuelResponse: HttpResponse<SellGroundFuel>) => {
                        const sellGroundFuel: SellGroundFuel = sellGroundFuelResponse.body;
                        this.ngbModalRef = this.sellGroundFuelModalRef(component, sellGroundFuel);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sellGroundFuel = new SellGroundFuel();
                    sellGroundFuel.dayDepotId = dayDepotId;
                    this.ngbModalRef = this.sellGroundFuelModalRef(component, sellGroundFuel);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sellGroundFuelModalRef(component: Component, sellGroundFuel: SellGroundFuel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sellGroundFuel = sellGroundFuel;
        modalRef.result.then(result => {
            this.closeModal(sellGroundFuel);
        },reason => {
            this.closeModal(sellGroundFuel);
        });
        return modalRef;
    }

    closeModal(sellGroundFuel) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
