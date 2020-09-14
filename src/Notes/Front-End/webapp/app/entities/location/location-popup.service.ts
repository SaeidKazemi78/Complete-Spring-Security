import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from './location.model';
import { LocationService } from './location.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class LocationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private locationService: LocationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, locationId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.locationService.find(id).subscribe(location => {
                    this.ngbModalRef = this.locationModalRef(component, location.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const location2 = new Location();
                    if (locationId !== 'root') {
                        location2.locationId = locationId;
                        this.locationService.find(locationId).subscribe(location => {
                            location2.level = location.body.level + 1;
                            this.locationModalRef(component, location2);
                        });
                    } else {
                        location2.level = 0;
                        this.locationModalRef(component, location2);
                    }
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    locationModalRef(component: Component, location: Location): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.location = location;
        modalRef.result.then(result => {
            this.closeModal(location);
        },reason => {
            this.closeModal(location);
        });
        return modalRef;
    }

    closeModal(location) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
