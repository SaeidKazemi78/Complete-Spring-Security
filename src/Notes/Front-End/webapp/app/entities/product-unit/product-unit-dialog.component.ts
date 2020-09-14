import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { ProductUnit } from './product-unit.model';
import { ProductUnitPopupService } from './product-unit-popup.service';
import { ProductUnitService } from './product-unit.service';

@Component({
    selector: 'jhi-product-unit-dialog',
    templateUrl: './product-unit-dialog.component.html'
})
export class ProductUnitDialogComponent implements OnInit {

    regexCode = /\d*/;
    productUnit: ProductUnit;
    isSaving: boolean;
    isView: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private productUnitService: ProductUnitService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productUnit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productUnitService.update(this.productUnit));
        } else {
            this.subscribeToSaveResponse(
                this.productUnitService.create(this.productUnit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductUnit>>) {
        result.subscribe((res: HttpResponse<ProductUnit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductUnit) {
        this.eventManager.broadcast({ name: 'productUnitListModification', content: 'OK'});
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
    selector: 'jhi-product-unit-popup',
    template: ''
})
export class ProductUnitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productUnitPopupService: ProductUnitPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productUnitPopupService
                    .open(ProductUnitDialogComponent as Component, params['id']);
            } else {
                this.productUnitPopupService
                    .open(ProductUnitDialogComponent as Component);
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
