import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ProductStep} from './product-step.model';
import {ProductStepPopupService} from './product-step-popup.service';
import {ProductStepService} from './product-step.service';
import {Product, ProductService} from '../product';
import {PaymentPeriod} from 'app/entities/bill/bill.model';

@Component({
    selector: 'jhi-product-step-dialog',
    templateUrl: './product-step-dialog.component.html'
})
export class ProductStepDialogComponent implements OnInit {

    productStep: ProductStep;
    isSaving: boolean;
    isView: boolean;
    productItems: any[];
    products: Product[];
    PaymentPeriod = PaymentPeriod;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productStepService: ProductStepService,
        private eventManager: JhiEventManager,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if(!this.productStep.id){
            this.productStep.paymentPeriod = this.PaymentPeriod[PaymentPeriod.MONTH];
        }
        this.loadProduct();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productStep.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productStepService.update(this.productStep));
        } else {
            this.subscribeToSaveResponse(
                this.productStepService.create(this.productStep));
        }
    }

    loadProduct() {
        this.productService.query(null)
            .subscribe(res => {
                this.products = res.body;
                const item = {label: '', value: ''};
                this.productItems = [];

                this.productItems.push(item);

                this.products.forEach(product => {
                    this.productItems.push({label: product.title, value: product.id});
                });
            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductStep>>) {
        result.subscribe((res: HttpResponse<ProductStep>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductStep) {
        this.eventManager.broadcast({name: 'productStepListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-product-step-popup',
    template: ''
})
export class ProductStepPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStepPopupService: ProductStepPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productStepPopupService
                    .open(ProductStepDialogComponent as Component, params['id']);
            } else {
                this.productStepPopupService
                    .open(ProductStepDialogComponent as Component);
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
