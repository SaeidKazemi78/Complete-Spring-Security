import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Currency } from './currency.model';
import { CurrencyService } from './currency.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CurrencyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private currencyService: CurrencyService

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
                this.currencyService.find(id)
                    .subscribe((currencyResponse: HttpResponse<Currency>) => {
                        const currency: Currency = currencyResponse.body;
                        this.ngbModalRef = this.currencyModalRef(component, currency);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.currencyModalRef(component, new Currency());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    currencyModalRef(component: Component, currency: Currency): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.currency = currency;
        modalRef.result.then(result => {
            this.closeModal(currency);
        },reason => {
            this.closeModal(currency);
        });
        return modalRef;
    }

    closeModal(currency) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
