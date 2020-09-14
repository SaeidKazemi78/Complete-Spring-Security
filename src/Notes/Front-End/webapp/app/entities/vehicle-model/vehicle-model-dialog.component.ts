import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerGroup, VehicleModel} from './vehicle-model.model';
import {VehicleModelPopupService} from './vehicle-model-popup.service';
import {VehicleModelService} from './vehicle-model.service';
import {Product, ProductService} from 'app/entities/product';

@Component({
    selector: 'jhi-vehicle-model-dialog',
    templateUrl: './vehicle-model-dialog.component.html'
})
export class VehicleModelDialogComponent implements OnInit {

    vehicleModel: VehicleModel;
    isSaving: boolean;
    isView: boolean;
    CustomerGroup = CustomerGroup;
    products: Product[];
    customProducts: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleModelService: VehicleModelService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.vehicleModel.id) {
            this.loadProducts(this.vehicleModel.customerGroup);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicleModel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleModelService.update(this.vehicleModel));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleModelService.create(this.vehicleModel));
        }
    }

    loadProducts(customerGroup) {
            this.productService.queryByCustomerGroup(customerGroup)
                .subscribe(res => {
                    this.products = res.body;
                    const product = {
                        value: '',
                        label: ''
                    };
                    this.customProducts = [];
                    this.customProducts.push(product);
                    for (let i = 0; i < this.products.length; i++) {
                        this.customProducts.push({
                            value: this.products[i].id,
                            label: this.products[i].title
                        });
                    }
                }, res => this.onError(res.message));
    }

    customerGroupChange() {
        this.loadProducts(this.vehicleModel.customerGroup);
        this.vehicleModel.vehicleModelType = null;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleModel>>) {
        result.subscribe((res: HttpResponse<VehicleModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleModel) {
        this.eventManager.broadcast({name: 'vehicleModelListModification', content: 'OK'});
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
    selector: 'jhi-vehicle-model-popup',
    template: ''
})
export class VehicleModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleModelPopupService: VehicleModelPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.vehicleModelPopupService
                    .open(VehicleModelDialogComponent as Component, params['id']);
            } else {
                this.vehicleModelPopupService
                    .open(VehicleModelDialogComponent as Component);
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
