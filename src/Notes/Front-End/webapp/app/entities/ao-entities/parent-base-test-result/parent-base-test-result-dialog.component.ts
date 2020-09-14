import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ParentBaseTestResult} from './parent-base-test-result.model';
import {ParentBaseTestResultPopupService} from './parent-base-test-result-popup.service';
import {ParentBaseTestResultService} from './parent-base-test-result.service';
import {ProductService} from '../../product';

@Component({
    selector: 'jhi-parent-base-test-result-dialog',
    templateUrl: './parent-base-test-result-dialog.component.html'
})
export class ParentBaseTestResultDialogComponent implements OnInit {

    parentBaseTestResult: ParentBaseTestResult;
    isSaving: boolean;
    isView: boolean;
    selectedProduct: any;
    customProducts: any[];
    private products: any[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parentBaseTestResultService: ParentBaseTestResultService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.parentBaseTestResult.id) {
            this.selectedProduct = this.parentBaseTestResult.productId;
        }

        this.productService.queryByHasContainer(false)
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
                if (this.parentBaseTestResult.id) {
                    this.selectedProduct = this.parentBaseTestResult.productId;
                }
            },res => this.onError(res.message));
    }

    onChangeProduct(data) {
        this.parentBaseTestResult.productId = data;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parentBaseTestResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parentBaseTestResultService.update(this.parentBaseTestResult));
        } else {
            this.subscribeToSaveResponse(
                this.parentBaseTestResultService.create(this.parentBaseTestResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParentBaseTestResult>>) {
        result.subscribe((res: HttpResponse<ParentBaseTestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParentBaseTestResult) {
        this.eventManager.broadcast({name: 'parentBaseTestResultListModification', content: 'OK'});
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
    selector: 'jhi-parent-base-test-result-popup',
    template: ''
})
export class ParentBaseTestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentBaseTestResultPopupService: ParentBaseTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.parentBaseTestResultPopupService
                    .open(ParentBaseTestResultDialogComponent as Component, params['id']);
            } else {
                this.parentBaseTestResultPopupService
                    .open(ParentBaseTestResultDialogComponent as Component);
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
