import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AirplaneModel } from './airplane-model.model';
import { AirplaneModelService } from './airplane-model.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class AirplaneModelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private airplaneModelService: AirplaneModelService

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
                this.airplaneModelService.find(id)
                    .subscribe((airplaneModelResponse: HttpResponse<AirplaneModel>) => {
                        const airplaneModel: AirplaneModel = airplaneModelResponse.body;
                        this.ngbModalRef = this.airplaneModelModalRef(component, airplaneModel);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.airplaneModelModalRef(component, new AirplaneModel());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    airplaneModelModalRef(component: Component, airplaneModel: AirplaneModel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.airplaneModel = airplaneModel;
        modalRef.result.then(result => {
            this.closeModal(airplaneModel);
        },reason => {
            this.closeModal(airplaneModel);
        });
        return modalRef;
    }

    closeModal(airplaneModel) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }
}
