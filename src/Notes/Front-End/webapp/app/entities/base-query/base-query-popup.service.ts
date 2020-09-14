import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseQuery } from './base-query.model';
import { BaseQueryService } from './base-query.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class BaseQueryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private baseQueryService: BaseQueryService

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
                this.baseQueryService.find(id).subscribe(baseQuery => {
                    this.ngbModalRef = this.baseQueryModalRef(component, baseQuery.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const baseQuery = new BaseQuery();
                    this.ngbModalRef = this.baseQueryModalRef(component, baseQuery);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    baseQueryModalRef(component: Component, baseQuery: BaseQuery): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.baseQuery = baseQuery;
        modalRef.result.then(result => {
            this.closeModal(baseQuery);
        },reason => {
            this.closeModal(baseQuery);
        });
        return modalRef;
    }

    closeModal(baseQuery) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
