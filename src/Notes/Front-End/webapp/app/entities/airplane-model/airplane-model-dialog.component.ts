import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AirplaneModel } from './airplane-model.model';
import { AirplaneModelPopupService } from './airplane-model-popup.service';
import { AirplaneModelService } from './airplane-model.service';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-airplane-model-dialog',
    templateUrl: './airplane-model-dialog.component.html'
})
export class AirplaneModelDialogComponent implements OnInit {

    airplaneModel: AirplaneModel;
    isSaving: boolean;

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private airplaneModelService: AirplaneModelService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airplaneModel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airplaneModelService.update(this.airplaneModel));
        } else {
            this.subscribeToSaveResponse(
                this.airplaneModelService.create(this.airplaneModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AirplaneModel>>) {
        result.subscribe((res: HttpResponse<AirplaneModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AirplaneModel) {
        this.eventManager.broadcast({ name: 'airplaneModelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-airplane-model-popup',
    template: ''
})
export class AirplaneModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airplaneModelPopupService: AirplaneModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.airplaneModelPopupService
                    .open(AirplaneModelDialogComponent as Component, params['id']);
            } else {
                this.airplaneModelPopupService
                    .open(AirplaneModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
