import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {OilTankContainer} from './oil-tank-container.model';
import {OilTankContainerService} from './oil-tank-container.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class OilTankContainerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private oilTankContainerService: OilTankContainerService
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
                this.oilTankContainerService.find(id)
                    .subscribe((oilTankContainerResponse: HttpResponse<OilTankContainer>) => {
                        const oilTankContainer: OilTankContainer = oilTankContainerResponse.body;
                        this.ngbModalRef = this.oilTankContainerModalRef(component, oilTankContainer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const oilTankContainer = new OilTankContainer();
                    this.ngbModalRef = this.oilTankContainerModalRef(component, oilTankContainer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    oilTankContainerModalRef(component: Component, oilTankContainer: OilTankContainer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.oilTankContainer = oilTankContainer;
        modalRef.result.then(result => {
            this.closeModal(oilTankContainer);
        },reason => {
            this.closeModal(oilTankContainer);
        });
        return modalRef;
    }

    closeModal(oilTankContainer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
