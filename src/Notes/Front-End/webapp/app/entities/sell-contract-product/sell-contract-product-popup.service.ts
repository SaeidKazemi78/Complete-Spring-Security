import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {SellContractProduct} from './sell-contract-product.model';
import {SellContractProductService} from './sell-contract-product.service';

@Injectable({providedIn: 'root'})
export class SellContractProductPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sellContractProductService: SellContractProductService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, sellContractId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sellContractProductService.find(id)
                    .subscribe((sellContractProductResponse: HttpResponse<SellContractProduct>) => {
                        const sellContractProduct: SellContractProduct = sellContractProductResponse.body;
                        console.log(sellContractProduct.startDate);
                        this.ngbModalRef = this.sellContractProductModalRef(component, sellContractProduct);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sellContractProduct = new SellContractProduct();
                    sellContractProduct.sellContractId = sellContractId;
                    this.ngbModalRef = this.sellContractProductModalRef(component, sellContractProduct);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sellContractProductModalRef(component: Component, sellContractProduct: SellContractProduct): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sellContractProduct = sellContractProduct;
        modalRef.result.then(result => {
            this.closeModal(sellContractProduct);
        }, reason => {
            this.closeModal(sellContractProduct);
        });
        return modalRef;
    }

    closeModal(sellContractProduct) {
        this.router.navigate(['/sell-contract/' + sellContractProduct.sellContractId + '/sell-contract-product', {outlets: {popup: null}}], {
            replaceUrl: true,
            queryParamsHandling: 'merge'
        });
        this.ngbModalRef = null;
    }
}
