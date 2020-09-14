import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CostElement} from './cost-element.model';
import {CostElementService} from './cost-element.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CostElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private costElementService: CostElementService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, costGroupId?: number | any, costId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costElementService.find(id).subscribe(costElement => {
                    this.ngbModalRef = this.costElementModalRef(component, costElement.body);
                    resolve(this.ngbModalRef);
                });
            } else if (costGroupId && !costId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const costElement = new CostElement();
                    costElement.costGroupId = costGroupId;
                    this.ngbModalRef = this.costElementModalRef(component, costElement);
                    resolve(this.ngbModalRef);
                }, 0);
            } else if (costId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const costElement = new CostElement();
                    costElement.costId = costId;
                    costElement.costGroupId = costGroupId;
                    this.ngbModalRef = this.costElementModalRef(component, costElement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costElementModalRef(component: Component, costElement: CostElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.costElement = costElement;
        modalRef.result.then(result => {
            this.closeModal(costElement);
        },reason => {
            this.closeModal(costElement);
        });
        return modalRef;
    }

    closeModal(costElement) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
