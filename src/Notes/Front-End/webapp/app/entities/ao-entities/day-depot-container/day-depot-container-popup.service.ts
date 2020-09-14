import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DayDepotContainer} from './day-depot-container.model';
import {DayDepotContainerService} from './day-depot-container.service';
import {getPath} from "app/core/router";

@Injectable({ providedIn: 'root' })
export class DayDepotContainerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private dayDepotContainerService: DayDepotContainerService
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
                this.dayDepotContainerService.find(id)
                    .subscribe((dayDepotContainerResponse: HttpResponse<DayDepotContainer>) => {
                        const dayDepotContainer: DayDepotContainer = dayDepotContainerResponse.body;
                        this.ngbModalRef = this.dayDepotContainerModalRef(component, dayDepotContainer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const dayDepotContainer = new DayDepotContainer();
                    dayDepotContainer.mainDayDepotId = mainDayDepotId;
                    this.ngbModalRef = this.dayDepotContainerModalRef(component, dayDepotContainer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dayDepotContainerModalRef(component: Component, dayDepotContainer: DayDepotContainer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dayDepotContainer = dayDepotContainer;
        modalRef.result.then(result => {
            this.closeModal(dayDepotContainer);
        },reason => {
            this.closeModal(dayDepotContainer);
        });
        return modalRef;
    }

    closeModal(dayDepotContainer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
