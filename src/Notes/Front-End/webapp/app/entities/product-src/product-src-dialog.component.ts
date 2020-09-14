import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ProductSrc} from './product-src.model';
import {ProductSrcPopupService} from './product-src-popup.service';
import {ProductSrcService} from './product-src.service';
import {Product, ProductService} from '../product';

@Component({
    selector: 'jhi-product-src-dialog',
    templateUrl: './product-src-dialog.component.html'
})
export class ProductSrcDialogComponent implements OnInit {

    productSrc: ProductSrc;
    isSaving: boolean;
    isView: boolean;
    productItems: any[];
    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productSrcService: ProductSrcService,
        private eventManager: JhiEventManager,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.loadProduct();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productSrc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productSrcService.update(this.productSrc));
        } else {
            this.subscribeToSaveResponse(
                this.productSrcService.create(this.productSrc));
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
                    this.productItems.push({label: product.title +' (' +product.code+' )' , value: product.id});
                });
            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductSrc>>) {
        result.subscribe((res: HttpResponse<ProductSrc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductSrc) {
        this.eventManager.broadcast({name: 'productSrcListModification', content: 'OK'});
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
    selector: 'jhi-product-src-popup',
    template: ''
})
export class ProductSrcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productSrcPopupService: ProductSrcPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productSrcPopupService
                    .open(ProductSrcDialogComponent as Component, params['id']);
            } else {
                this.productSrcPopupService
                    .open(ProductSrcDialogComponent as Component);
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
