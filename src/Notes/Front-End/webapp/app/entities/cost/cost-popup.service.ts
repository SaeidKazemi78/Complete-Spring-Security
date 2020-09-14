import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Cost} from './cost.model';
import {CostService} from './cost.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CostPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private costService: CostService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, costGroupId?: number | any, costId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costService.find(id).subscribe(cost => {
                    this.ngbModalRef = this.costModalRef(component, cost.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                setTimeout(() => {
                    const cost = new Cost();
                    cost.costGroupId = costGroupId;
                    cost.parentId = costId;
                    this.ngbModalRef = this.costModalRef(component, cost);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costModalRef(component: Component, cost: Cost): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cost = cost;
        modalRef.result.then(result => {
            this.closeModal(cost);
        },reason => {
            this.closeModal(cost);
        });
        return modalRef;
    }

    closeModal(cost) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
