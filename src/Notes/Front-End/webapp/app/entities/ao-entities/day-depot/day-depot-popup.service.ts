import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DayDepot} from './day-depot.model';
import {DayDepotService} from './day-depot.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class DayDepotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private dayDepotService: DayDepotService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, mainDayDepotId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dayDepotService.find(id)
                    .subscribe((dayDepotResponse: HttpResponse<DayDepot>) => {
                        const dayDepot: DayDepot = dayDepotResponse.body;
                        this.ngbModalRef = this.dayDepotModalRef(component, dayDepot);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const dayDepot = new DayDepot();
                    dayDepot.mainDayDepotId = mainDayDepotId;
                    this.ngbModalRef = this.dayDepotModalRef(component, dayDepot);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dayDepotModalRef(component: Component, dayDepot: DayDepot): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dayDepot = dayDepot;
        modalRef.result.then(result => {
            this.closeModal(dayDepot);
        },reason => {
            this.closeModal(dayDepot);
        });
        return modalRef;
    }

    closeModal(dayDepot) {
        if (dayDepot.mainDayOperationId) {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {
                replaceUrl: true,
                queryParamsHandling: 'merge'
            });
        } else {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {
                replaceUrl: true,
                queryParamsHandling: 'merge'
            });
        }
        this.ngbModalRef = null;
    }
}
