import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CarBak} from './car-bak.model';
import {CarBakPopupService} from './car-bak-popup.service';
import {CarBakService} from './car-bak.service';
import {Car, CarService} from '../car';
import {Product, ProductService} from '../product';
import {CustomerGroup} from '../customer-type';

@Component({
    selector: 'jhi-car-bak-dialog',
    templateUrl: './car-bak-dialog.component.html'
})
export class CarBakDialogComponent implements OnInit {

    carBak: CarBak;
    isSaving: boolean;
    isView: boolean;

    products: Product[];
    CustomerGroup = CustomerGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carBakService: CarBakService,
        private carService: CarService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.productService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.AIRPLANE])
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carBak.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carBakService.update(this.carBak));
        } else {
            this.subscribeToSaveResponse(
                this.carBakService.create(this.carBak));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarBak>>) {
        result.subscribe((res: HttpResponse<CarBak>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarBak) {
        this.eventManager.broadcast({name: 'carBakListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCarById(index: number, item: Car) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-car-bak-popup',
    template: ''
})
export class CarBakPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carBakPopupService: CarBakPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.carBakPopupService
                    .open(CarBakDialogComponent as Component, params['id']);
            } else if (params['carId']) {
                this.carBakPopupService
                    .open(CarBakDialogComponent as Component, null, params['carId']);
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
