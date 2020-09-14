import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CostGroup} from './cost-group.model';
import {CostGroupService} from './cost-group.service';
import {Cost} from '../cost';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class CostGroupPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private costGroupService: CostGroupService
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
                this.costGroupService.find(id).subscribe(costGroup => {
                    if (!costGroup.body.singleCost) {
                        costGroup.body.cost = new Cost();
                    }
                    this.ngbModalRef = this.costGroupModalRef(component, costGroup.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const costGroup = new CostGroup();
                    costGroup.singleCost = true;
                    costGroup.cost = new Cost();
                    this.ngbModalRef = this.costGroupModalRef(component, costGroup);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costGroupModalRef(component: Component, costGroup: CostGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.costGroup = costGroup;
        modalRef.result.then(result => {
            this.closeModal(costGroup);
        }, reason => {
            this.closeModal(costGroup);
        });
        return modalRef;
    }

    closeModal(costGroup) {
        this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
