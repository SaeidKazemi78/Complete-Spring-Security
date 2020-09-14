import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BoundaryTag } from './boundary-tag.model';
import { BoundaryTagService } from './boundary-tag.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BoundaryTagPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private boundaryTagService: BoundaryTagService

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
                this.boundaryTagService.find(id).subscribe(boundaryTag => {
                    this.ngbModalRef = this.boundaryTagModalRef(component, boundaryTag.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const boundaryTag = new BoundaryTag();
                    boundaryTag.locationId = locationId;
                    this.ngbModalRef = this.boundaryTagModalRef(component, boundaryTag);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    boundaryTagModalRef(component: Component, boundaryTag: BoundaryTag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.boundaryTag = boundaryTag;
        modalRef.result.then(result => {
            this.closeModal(boundaryTag);
        },reason => {
            this.closeModal(boundaryTag);
        });
        return modalRef;
    }

    closeModal(boundaryTag) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
