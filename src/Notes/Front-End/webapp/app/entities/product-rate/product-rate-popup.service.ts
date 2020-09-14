import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ProductRate} from './product-rate.model';
import {ProductRateService} from './product-rate.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class ProductRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private productRateService: ProductRateService) {
        this.ngbModalRef = null;
    }

    open(component: Component, type, id?: number | any, rateGroupId?: number | any): Promise<NgbModalRef> {

        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productRateService.find(id).subscribe(productRate => {
                    this.ngbModalRef = this.productRateModalRef(component, type, productRate.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productRate = new ProductRate();
                    if (rateGroupId) {
                        productRate.rateGroupId = rateGroupId;
                    }
                    this.ngbModalRef = this.productRateModalRef(component, type, productRate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productRateModalRef(component: Component, type, productRate: ProductRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productRate = productRate;
        modalRef.result.then(result => {
            this.closeModal(productRate, type);
        }, reason => {
            this.closeModal(productRate, type);
        });
        return modalRef;
    }

    closeModal(productRate, type) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
