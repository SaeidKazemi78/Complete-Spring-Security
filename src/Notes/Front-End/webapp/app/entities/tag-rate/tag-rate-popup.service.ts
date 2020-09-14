import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TagRate } from './tag-rate.model';
import { TagRateService } from './tag-rate.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class TagRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private tagRateService: TagRateService

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
                this.tagRateService.find(id).subscribe(tagRate => {
                    this.ngbModalRef = this.tagRateModalRef(component, tagRate.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const tagRate = new TagRate();
                    tagRate.locationId = locationId;
                    this.ngbModalRef = this.tagRateModalRef(component, tagRate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tagRateModalRef(component: Component, tagRate: TagRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tagRate = tagRate;
        modalRef.result.then(result => {
            this.closeModal(tagRate);
        },reason => {
            this.closeModal(tagRate);
        });
        return modalRef;
    }

    closeModal(tagRate) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
