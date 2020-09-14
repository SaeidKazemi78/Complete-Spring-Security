import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VehicleCapacity} from './vehicle-capacity.model';
import {VehicleCapacityPopupService} from './vehicle-capacity-popup.service';
import {VehicleCapacityService} from './vehicle-capacity.service';
import {VehicleModel, VehicleModelService} from '../vehicle-model';
import {Product, ProductService} from '../product';

@Component({
    selector: 'jhi-vehicle-capacity-dialog',
    templateUrl: './vehicle-capacity-dialog.component.html'
})
export class VehicleCapacityDialogComponent implements OnInit {

    vehicleCapacity: VehicleCapacity;
    isSaving: boolean;
    isView: boolean;

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleCapacityService: VehicleCapacityService,
        private vehicleModelService: VehicleModelService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.productService.query()
            .subscribe(value => {
                this.products = value.body;
            });
        /*this.productService.queryForCars(CustomerGroup[CustomerGroup.BOUNDARY])
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicleCapacity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleCapacityService.update(this.vehicleCapacity));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleCapacityService.create(this.vehicleCapacity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleCapacity>>) {
        result.subscribe((res: HttpResponse<VehicleCapacity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleCapacity) {
        this.eventManager.broadcast({name: 'vehicleCapacityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vehicle-capacity-popup',
    template: ''
})
export class VehicleCapacityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleCapacityPopupService: VehicleCapacityPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.vehicleCapacityPopupService
                    .open(VehicleCapacityDialogComponent as Component, params['id']);
            } else if (params['vehicleModelId']) {
                this.vehicleCapacityPopupService
                    .open(VehicleCapacityDialogComponent as Component, null, params['vehicleModelId']);
            } else {
                console.log('not be');
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
