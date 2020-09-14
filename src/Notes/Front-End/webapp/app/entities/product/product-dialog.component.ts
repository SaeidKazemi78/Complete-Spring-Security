import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';

import {Product} from './product.model';
import {ProductPopupService} from './product-popup.service';
import {ProductService} from './product.service';
import {ProductGroup, ProductGroupService} from '../product-group';
import {ProductUnit, ProductUnitService} from '../product-unit';
import {Container, ContainerService} from '../container';
import {CustomerGroup} from '../customer-type';

@Component({
    selector: 'jhi-product-dialog',
    templateUrl: './product-dialog.component.html'
})
export class ProductDialogComponent implements OnInit {

    regexCode = /^[\d]{6}$/;
    product: Product;
    isSaving: boolean;

    productgroups: ProductGroup[];

    productunits: ProductUnit[];
    isView: boolean;

    containers: Container[];
    CustomerGroup = CustomerGroup;
    customerGroups = [];

    constructor(
        public activeModal: NgbActiveModal,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private productService: ProductService,
        private productGroupService: ProductGroupService,
        private productUnitService: ProductUnitService,
        private containerService: ContainerService,
        private eventManager: JhiEventManager,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.product.id) {
            this.checkContainer();
        }
        this.productGroupService.query().subscribe(
            (res: HttpResponse<ProductGroup[]>) => {
                this.productgroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productUnitService.query().subscribe(
            (res: HttpResponse<ProductUnit[]>) => {
                this.productunits = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        for (const customerGroupKey in CustomerGroup) {
            if (isNaN(parseInt(customerGroupKey, 10))) {
                this.translateService.get('niopdcgatewayApp.CustomerGroup.' + customerGroupKey)
                    .subscribe(value => {
                        this.customerGroups.push({
                            value: customerGroupKey,
                            label: value
                        });
                    });
            }
        }

    }

    checkContainer() {
        if (this.product.hasContainer === true && this.product.productUnitId) {
            this.containerService.queryByProductUnit(this.product.productUnitId)
                .subscribe((res: HttpResponse<Container[]>) => {
                    this.containers = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        } else {
            this.product.containerId = null;
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean) {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product), showNextLevel);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Product>>, showNextLevel ?: boolean) {
        result.subscribe((res: HttpResponse<Product>) =>
            this.onSaveSuccess(res.body, showNextLevel), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Product, showNextLevel ?: boolean) {
        this.eventManager.broadcast({name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNextLevel) {
            setTimeout(() => {
                this.router.navigateByUrl(`/product/${result.id}/product-rate(popup:product-rate-new/product/${result.id})`);
            }, 1000);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductGroupById(index: number, item: ProductGroup) {
        return item.id;
    }

    trackProductUnitById(index: number, item: ProductUnit) {
        return item.id;
    }

    trackContainerById(index: number, item: Container) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-popup',
    template: ''
})
export class ProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productPopupService: ProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.productPopupService
                    .open(ProductDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductDialogComponent as Component);
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
