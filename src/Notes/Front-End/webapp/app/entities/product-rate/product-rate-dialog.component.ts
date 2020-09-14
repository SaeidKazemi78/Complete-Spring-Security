import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ProductRate} from './product-rate.model';
import {ProductRatePopupService} from './product-rate-popup.service';
import {ProductRateService} from './product-rate.service';
import {Currency, CurrencyService} from '../currency';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {RateGroup, RateGroupService} from '../rate-group';
import {CustomerTypeService} from '../customer-type/customer-type.service';
import {CustomerType} from '../customer-type/customer-type.model';
import {RegionService} from '../region/region.service';
import {Region} from '../region/region.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Product, ProductService} from '../product';
import {Container, ContainerService} from '../container';
import {CustomerGroup} from '../customer-type';
import {ProductSrc, ProductSrcService} from '../product-src';
import {ProductStep, ProductStepService} from '../product-step';
import {Principal} from "app/shared";

@Component({
    selector: 'jhi-product-rate-dialog',
    templateUrl: './product-rate-dialog.component.html'
})
export class ProductRateDialogComponent implements OnInit {

    productRate: ProductRate;
    isSaving: boolean;
    isView: boolean;
    customerTypes: any[];
    allCustomerTypes: any[];
    regions: Region[] = [];
    regexCode = /^[\d]{5}$/;
    rateGroupId: number;
    type: string;
    currencies: Currency[];

    currencyrategroups: CurrencyRateGroup[];

    disableFields: boolean;
    maxDate: any;
    galon: boolean;
    galonAmount: number;

    containers: Container[];
    selectedContainer: any;
    customContainers: any[];
    productSrcs: ProductSrc[];
    products: Product[];
    selectedProduct: any;
    customProducts: any[];
    minDate = new Date();
    endTime: string;
    customProductSrcs: any[];
    CustomerGroup = CustomerGroup;
    rateGroup: RateGroup | null;
    productSteps: ProductStep[];
    isEditSrc: boolean;
    isAdmin: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private productRateService: ProductRateService,
                private productStepService: ProductStepService,
                private currencyService: CurrencyService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService,
                private productSrcService: ProductSrcService,
                private productService: ProductService,
                private containerService: ContainerService,
                private regionService: RegionService,
                private router: Router,
                private customerTypeService: CustomerTypeService,
                private principal: Principal,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {

        this.principal.hasAuthority('ROLE_ADMIN')
            .then(value => {
                this.isAdmin = value.valueOf();
            });
        this.principal.hasAnyAuthority(['EDIT_SRC'])
            .then(value => {
                this.isEditSrc = value.valueOf();
            });

        this.rateGroupId = UsefulId.rateGroupId;
        this.type = UsefulId.type;
        this.isView = View.isView;
        this.productRate.adjustment = View.isAdjustment;
        this.isSaving = false;
        this.rateGroup = new RateGroup();

        if (!this.productRate.finishDate) {
            this.endTime = new Date().getHours() + ':' + new Date().getMinutes();
        }

        this.rateGroupService.find(this.productRate.rateGroupId).subscribe(value => {

            this.rateGroup = value.body;
            if ((this.rateGroup.contractTypes && this.rateGroup.contractTypes.indexOf('EXPORT') > -1)) {
                this.isView = true;
            }

            if (this.rateGroup.foreignExchange) {
                this.currencyService.query()
                    .subscribe(res => {
                        this.currencies = res.body.filter(value1 => !value1.isNationalCurrency);
                    }, res => this.onError(res.body));
            }

            if (this.products) {
                this.onChangeProduct(this.productRate.productId);
            }

        });

        this.loadProduct();
        this.loadContainer();
        if (this.productRate.id) {
            if (this.type === 'product') {
                this.galonAmount = this.productRate.price * 0.264178;
                this.productRateService.isUseProductRateInOrderProduct(this.productRate.id)
                    .subscribe(value => {
                        this.maxDate = value.body;
                        if (this.maxDate) {
                            this.maxDate = new Date(this.maxDate);
                            this.disableFields = true;
                        }
                    });
            } else if (this.productRate.containerId) {
                this.productRateService.isUseContainerRateInOrderProduct(this.productRate.id)
                    .subscribe(value => {
                        this.maxDate = value.body;
                        if (this.maxDate) {
                            this.maxDate = new Date(this.maxDate);
                            this.disableFields = true;
                        }
                    });
            }
        }

        this.currencyRateGroupService.query()
            .subscribe(res => {
                this.currencyrategroups = res.body;
            }, res => this.onError(res.message));

        this.customerTypeService.query().subscribe(customerTypes => {
            this.allCustomerTypes = customerTypes.body;
            this.customerTypes = [];
            this.allCustomerTypes.forEach((value: CustomerType) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customerTypes.push(newVar);
            });
        });
    }

    loadContainer() {
        this.containerService.query()
            .subscribe(res => {
                this.containers = res.body;
                const container = {
                    value: '',
                    label: ''
                };
                this.customContainers = [];
                this.customContainers.push(container);
                for (let i = 0; i < this.containers.length; i++) {
                    this.customContainers.push({
                        value: this.containers[i].id,
                        label: this.containers[i].title
                    });
                    /*        this.products[i].value = this.products[i].id;
                            this.products[i].label = this.products[i].title;*/
                }
                if (this.productRate.id) {
                    this.selectedContainer = this.productRate.containerId;
                }
            }, res => this.onError(res.message));
    }

    loadProduct() {
        this.productService.queryByHasContainerAndRateGroup(this.productRate.rateGroupId, false)
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
                    /*        this.products[i].value = this.products[i].id;
                            this.products[i].label = this.products[i].title;*/
                }
                if (this.productRate.id) {
                    this.selectedProduct = this.productRate.productId;
                    this.onChangeProduct(this.productRate.productId);
                }
            }, res => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.productRate.id !== undefined) {
            if (this.productRate.productId) {
                this.subscribeToSaveResponse(
                    this.productRateService.updateByProduct(this.productRate));
            } else if (this.productRate.containerId) {
                this.subscribeToSaveResponse(
                    this.productRateService.updateByContainer(this.productRate));
            }
        } else {
            if (this.productRate.productId) {
                this.subscribeToSaveResponse(
                    this.productRateService.createByProduct(this.productRate), showNext);
            } else if (this.productRate.containerId) {
                this.subscribeToSaveResponse(
                    this.productRateService.createByContainer(this.productRate));
            }
        }
    }

    changePrice(event, changePrice) {
        if (changePrice) {
            const amount = Number(event) * 0.264178;
            this.galonAmount = Math.ceil(amount);
            console.log(amount);
            console.log(this.galonAmount);
        } else {
            this.galonAmount = Number(event);
            this.productRate.price = Math.ceil(Number(event) / 0.264178);
        }
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackCurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    trackRateGroupById(index: number, item: RateGroup) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductRate>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<ProductRate>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductRate, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'productRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(`/product/${result.productId}/product-rate(popup:product-rate-new/product/${result.productId})`);
            }, 1000);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onChangeProduct(data) {
        this.productRate.productId = data;

        if (this.productRate.productId) {
            if (this.rateGroup.step && this.rateGroup.paymentPeriod) {
                this.productStepService.findAllByProductId(this.productRate.productId, this.rateGroup.paymentPeriod).subscribe(value => {
                    this.productSteps = value.body;

                    if (!this.productSteps.find(value1 => value1.id === this.productRate.productStepId)) {
                        this.productRate.productStepId = undefined;
                    }

                });
            }
        } else {
            this.productSteps = [];
        }

        if (!this.productRate.productId) {
            this.customProductSrcs = [];
        } else {
            this.customProductSrcs = [];
            this.productSrcService.query({'productId': data})
                .subscribe((res) => {

                    this.productSrcs = res.body;
                    this.customProductSrcs = [{
                        value: null,
                        label: ''
                    }];

                    this.productSrcs.forEach(value => {
                            this.customProductSrcs.push({
                                value: value.src,
                                label: value.src
                            });
                        }
                    );

                }, (res) => this.onError(res.message));
        }

    }

    onChangeContainer(data) {
        this.productRate.containerId = data;
    }
}

@Component({
    selector: 'jhi-product-rate-popup',
    template: ''
})
export class ProductRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productRatePopupService: ProductRatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            console.log(this.route.params['adjustment']);
            View.isView = params['view'] === 'view';
            View.isAdjustment = params['view'] === 'adjustment';
            UsefulId.type = params['type'];
            if (params['id']) {
                this.productRatePopupService
                    .open(ProductRateDialogComponent as Component, UsefulId.type, params['id']);
            } else if (params['rateGroupId']) {
                UsefulId.rateGroupId = params['rateGroupId'];
                this.productRatePopupService
                    .open(ProductRateDialogComponent as Component, UsefulId.type, null, params['rateGroupId']);
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
    static isAdjustment: boolean;
}

class UsefulId {
    static rateGroupId: number;
    static type: string;
}
