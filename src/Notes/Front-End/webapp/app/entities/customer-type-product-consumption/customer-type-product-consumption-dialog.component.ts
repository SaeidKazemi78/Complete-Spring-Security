import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerTypeProductConsumption } from './customer-type-product-consumption.model';
import { CustomerTypeProductConsumptionPopupService } from './customer-type-product-consumption-popup.service';
import { CustomerTypeProductConsumptionService } from './customer-type-product-consumption.service';
import { CustomerType, CustomerTypeService } from '../customer-type';
import { Product, ProductService } from '../product';
import { Consumption, ConsumptionService } from '../consumption';

@Component({
    selector: 'jhi-customer-type-product-consumption-dialog',
    templateUrl: './customer-type-product-consumption-dialog.component.html'
})
export class CustomerTypeProductConsumptionDialogComponent implements OnInit {

    customerTypeProductConsumption: CustomerTypeProductConsumption;
    isSaving: boolean;

    customerTypes: CustomerType[];

    isView: boolean;

    consumptions: Consumption[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerTypeProductConsumptionService: CustomerTypeProductConsumptionService,
        private customerTypeService: CustomerTypeService,
        private productService: ProductService,
        private consumptionService: ConsumptionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.customerTypeService.query()
            .subscribe((res: HttpResponse<CustomerType[]>) => { this.customerTypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.consumptionService.query()
            .subscribe((res: HttpResponse<Consumption[]>) => { this.consumptions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerTypeProductConsumption.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerTypeProductConsumptionService.update(this.customerTypeProductConsumption));
        } else {
            this.subscribeToSaveResponse(
                this.customerTypeProductConsumptionService.create(this.customerTypeProductConsumption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerTypeProductConsumption>>) {
        result.subscribe((res: HttpResponse<CustomerTypeProductConsumption>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerTypeProductConsumption) {
        this.eventManager.broadcast({ name: 'customerTypeProductConsumptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackConsumptionById(index: number, item: Consumption) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-type-product-consumption-popup',
    template: ''
})
export class CustomerTypeProductConsumptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypeProductConsumptionPopupService: CustomerTypeProductConsumptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if ( params['id'] ) {
                this.customerTypeProductConsumptionPopupService
                    .open(CustomerTypeProductConsumptionDialogComponent as Component, params['id']);
            } else {
                this.customerTypeProductConsumptionPopupService
                    .open(CustomerTypeProductConsumptionDialogComponent as Component, null, params['productId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
