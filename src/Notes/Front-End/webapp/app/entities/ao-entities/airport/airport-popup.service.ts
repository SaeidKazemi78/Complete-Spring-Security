import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Airport} from './airport.model';
import {AirportService} from './airport.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class AirportPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private airportService: AirportService
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
                this.airportService.find(id).subscribe(airport => {
                    this.ngbModalRef = this.airportModalRef(component, airport.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const airport = new Airport();
                    this.ngbModalRef = this.airportModalRef(component, airport);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    airportModalRef(component: Component, airport: Airport): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.airport = airport;
        modalRef.result.then(result => {
            this.closeModal(airport);
        },reason => {
            this.closeModal(airport);
        });
        return modalRef;
    }

    closeModal(airport) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
