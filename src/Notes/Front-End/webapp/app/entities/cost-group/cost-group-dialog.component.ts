import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {
    CostCategory,
    CostGroup,
    CostGroupType,
    CostMaterialType,
    CostMethod,
    CostType,
    Forced,
    PaymentPeriod
} from './cost-group.model';
import {CostGroupPopupService} from './cost-group-popup.service';
import {CostGroupService} from './cost-group.service';
import {Cost, CostAction, CostService, Effect} from '../cost';
import {Product, ProductService} from '../product';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Principal} from '../../shared';
import {LocationService} from '../location';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {VehicleModelType} from '../vehicle-model';
import {RateType} from '../cost/cost.model';

@Component({
    selector: 'jhi-cost-group-dialog',
    templateUrl: './cost-group-dialog.component.html'
})
export class CostGroupDialogComponent implements OnInit {
    CostGroupType = CostGroupType;
    CostCategory = CostCategory;
    PaymentPeriod = PaymentPeriod;
    CostType = CostType;
    CustomerGroup = CustomerGroup;
    Forced = Forced;
    CostMethod = CostMethod;
    costAction = CostAction;
    Effect = Effect;
    VehicleModelType = VehicleModelType;
    CostMaterialType = CostMaterialType;
    CostAction = CostAction;
    RateType = RateType;

    costGroup: CostGroup = new CostGroup();
    isSaving: boolean;
    isView: boolean;
    disabledCostCategory: boolean;
    disabledCostGroupType: boolean;
    disabledForced: boolean;
    disabledCostType: boolean;
    disabledCostMethod: boolean;
    disabledPaymentPeriod: boolean;
    disabledVehicleModelTypes: boolean;
    disabledCustomerType: boolean;
    disabledCostMaterialType: boolean;
    disabledCostAction: boolean;
    disabledRateType: boolean;
    disabledEffect: boolean;

    costs: Cost[];
    products: any[];
    allproducts: any[];
    productsMapping = new Map();
    customerTypes: any[];
    customerTypesMapping = new Map();
    allcustomerTypes: any[];

    authorities: any[] = [];
    niopdcbankaccountTypes: NiopdcBankAccountType[];
    locations: any[];
    customLocation: any[];
    selectedLocation: any[];
    vehicleModelTypeOptions: any[] = [];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private costGroupService: CostGroupService,
                private costService: CostService,
                private productService: ProductService,
                private router: Router,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private locationService: LocationService,
                private translateService: TranslateService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.changeCustomerGroup();

        for (const vmt in VehicleModelType) {
            if (vmt !== this.VehicleModelType[VehicleModelType.AIRPLANE] && isNaN(parseInt(vmt, 10))) {
                this.vehicleModelTypeOptions.push({
                    value: vmt,
                    label: this.translateService.instant('niopdcgatewayApp.VehicleModelType.' + vmt),

                });
            }
        }

        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccountTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'CREATE_COST_GROUP_TRADE', 'DELETE_COST_GROUP_TRADE', 'EDIT_COST_GROUP_TRADE']).then(((value: boolean) => {
            if (value) {
                this.authorities.push({
                    label: this.translateService.instant('niopdcgatewayApp.Authority.AUTH1'),
                    'value': 'TRADE'
                });
            }
        }));

        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'EDIT_COST_GROUP_FINANCIAL', 'CREATE_COST_GROUP_FINANCIAL', 'DELETE_COST_GROUP_FINANCIAL']).then((value: boolean) => {
            if (value) {
                this.authorities.push({
                    label: this.translateService.instant('niopdcgatewayApp.Authority.AUTH2'),
                    'value': 'FINANCIAL'
                });
            }

        });

        this.isView = View.isView;
        this.isSaving = false;
        this.costGroup.singleCost = !this.costGroup.singleCost;
        this.costGroup.canSetVehicleModelTypes = this.costGroup.vehicleModelTypes && this.costGroup.vehicleModelTypes.length !== 0;
        this.costGroup.canSetLocationIds = this.costGroup.locationIds && this.costGroup.locationIds.length !== 0;
        this.costGroup.canSetProductIds = this.costGroup.productIds && this.costGroup.productIds.length !== 0;
        this.costGroup.selectiveContractTypes = this.costGroup.contractTypes && this.costGroup.contractTypes.length !== 0;
        this.costGroup.canSetCustomerTypeIds = this.costGroup.customerTypeIds && this.costGroup.customerTypeIds.length !== 0;
        this.setLocations();
    }

    //region Cost Group
    setLocations() {
        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            if (this.costGroup.locationIds && this.costGroup.locationIds.length > 0) {
                this.costGroup.boundaryLocationIds = this.costGroup.locationIds;
                this.costGroup.canSetLocationIds = true;
                this.costGroup.locationIds = [];
            }
        }
    }

    changeCustomerGroup() {
        // انواع
        if (!(this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.SELLER] ||
            this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.STATION])) {
            this.costGroup.costCategory = this.CostCategory[CostCategory.COST];
            this.disabledCostCategory = true;
        } else {
            this.disabledCostCategory = false;
        }
        this.changeCostCategory();

        // اختیاری
        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            this.costGroup.forced = this.Forced[Forced.FORCE];
            this.disabledForced = true;
        } else {
            this.disabledForced = false;
        }

        // فرآورده
        this.changeCanSetProduct();

        // نوع مشتری
        if (this.costGroup.customerGroup != null) {
            if (this.customerTypesMapping.has(this.costGroup.customerGroup)) {
                this.allcustomerTypes = this.customerTypesMapping.get(this.costGroup.customerGroup);
                this.applyCustomerTypes();
            } else {
                this.customerTypeService.queryByCustomerGroup(this.costGroup.customerGroup).subscribe(customerTypes => {
                    this.allcustomerTypes = customerTypes.body;
                    this.customerTypesMapping.set(this.costGroup.customerGroup, this.allcustomerTypes);
                    this.applyCustomerTypes();
                });
            }
            this.disabledCustomerType = false;
        } else {
            this.costGroup.canSetCustomerTypeIds = false;
            this.disabledCustomerType = true;
        }

        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            this.disabledVehicleModelTypes = false;
        } else {
            this.costGroup.canSetVehicleModelTypes = false;
            this.disabledVehicleModelTypes = true;
        }

        // نقاط مرزی
        if (this.costGroup.customerGroup === this.CustomerGroup[this.CustomerGroup.BOUNDARY]) {
            if (!this.locations) {
                this.locationService.queryByLevel(3)
                    .subscribe(value => {
                        this.locations = value.body;
                        this.customLocation = [];
                        for (let i = 0; i < this.locations.length; i++) {
                            this.customLocation.push({
                                value: this.locations[i].id,
                                label: this.locations[i].name
                            });
                        }
                    });
            }
        }
        this.setTitle();
    }

    changeCostCategory() {

        if (this.costGroup.costCategory !== this.CostCategory[CostCategory.COST]) { // اگر انواع گروه هزینه هزینه ای نباشد آنگاه نحوه پرداخت با صورت حساب است
            this.costGroup.costType = this.CostType[CostType.BILL];
            this.disabledCostType = true;
        } else if (!(this.costGroup.customerGroup === CustomerGroup[CustomerGroup.SELLER] ||
            this.costGroup.customerGroup === CustomerGroup[CustomerGroup.STATION])) { //  جایگاه یا فروشندگی نباشد آنگاه نحوه پرداخت با حواله و غیر فعال باشد
            this.costGroup.costType = this.CostType[CostType.WITH_ORDER];
            this.disabledCostType = true;
        } else {
            this.disabledCostType = false;
        }
        this.changeCostType();

        if (!(this.costGroup.customerGroup === CustomerGroup[CustomerGroup.BOUNDARY] ||
            (this.costGroup.customerGroup === CustomerGroup[CustomerGroup.SELLER] ||
                this.costGroup.customerGroup === CustomerGroup[CustomerGroup.STATION]) &&
            (this.costGroup.costCategory === this.CostCategory[CostCategory.WAGE]))) {
            if (!this.costGroup.id) {
                this.costGroup.costGroupType = this.CostGroupType[CostGroupType.CASH];
            }
            this.disabledCostGroupType = true;
        } else {
            this.disabledCostGroupType = false;
        }
        this.changeCostGroupType();

        if (this.costGroup.costCategory !== this.CostCategory[CostCategory.WAGE]) {
            if (!this.costGroup.id) {
                this.costGroup.costGroupType = this.CostGroupType[CostGroupType.CASH];
            }
        } else {
            this.costGroup.cost.costAction = this.CostAction[CostAction.EFFECTLESS];
        }

        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY] ||
            this.costGroup.costCategory !== this.CostCategory[CostCategory.COST]) {
            this.disabledCostMaterialType = true;
            this.costGroup.costMaterialType = this.CostMaterialType[CostMaterialType.PRODUCT];
        } else {
            this.disabledCostMaterialType = false;
        }
        this.changeCostAction();

    }

    changeCostGroupType() {

        if (!(this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.AIRPLANE] ||
            (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY] &&
                this.costGroup.costGroupType !== this.CostGroupType[CostGroupType.ALPHA]))) {
            this.costGroup.costMethod = this.CostMethod[CostMethod.NORMAL_SALES];
            this.disabledCostMethod = true;
        } else {
            this.disabledCostMethod = false;
        }

        if (this.costGroup.costGroupType === this.CostGroupType[CostGroupType.LADDER]) {
            this.costGroup.singleCost = false;
        }

        if (this.costGroup.costGroupType === this.CostGroupType[CostGroupType.ALPHA] ||
            this.costGroup.costGroupType === this.CostGroupType[CostGroupType.WAGE]) {
            this.costGroup.cost.costAction = this.CostAction[CostAction.EFFECTLESS];
            this.disabledCostAction = true;
        } else {
            this.disabledCostAction = false;
        }
        if (this.costGroup.costCategory === CostCategory[CostCategory.WAGE]) {
            this.costGroup.cost.costAction = null;
        }
        this.changeCostAction();

        if (this.costGroup.costGroupType === this.CostGroupType[CostGroupType.ALPHA]) {
            this.costGroup.cost.rateType = this.RateType[RateType.PERCENT];
            this.disabledRateType = true;
        } else {
            this.disabledRateType = false;
        }
        this.setTitle();

    }

    changeCostType() {
        if (this.costGroup.costType !== this.CostType[CostType.BILL]) {
            this.disabledPaymentPeriod = true;
            this.costGroup.paymentPeriod = undefined;
        } else {
            this.disabledPaymentPeriod = false;
            if (!this.costGroup.paymentPeriod) {
                this.costGroup.paymentPeriod = this.PaymentPeriod[PaymentPeriod.MONTH];
            }
        }
    }

    changeCanSetProduct() {
        if (this.costGroup.canSetProductIds) {
            if (this.costGroup.customerGroup) {
                if (this.productsMapping.has(this.costGroup.customerGroup)) {
                    this.allproducts = this.productsMapping.get(this.costGroup.customerGroup);
                    this.applyProduct();
                } else {
                    this.productService.queryByCustomerGroup(this.costGroup.customerGroup).subscribe(products => {
                        this.allproducts = products.body;
                        this.productsMapping.set(this.costGroup.customerGroup, this.allproducts);
                        this.applyProduct();
                    });
                }
            } else {
                if (this.productsMapping.has('ALL')) {
                    this.allproducts = this.productsMapping.get('ALL');
                    this.applyProduct();
                } else {
                    this.productService.query().subscribe(products => {
                        this.allproducts = products.body;
                        this.productsMapping.set('ALL', this.allproducts);
                        this.applyProduct();
                    });
                }
            }
        }
    }

    applyProduct() {
        this.products = [];
        if (this.allproducts) {
            this.allproducts.forEach((value: Product) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.products.push(newVar);
            });
        }

        this.costGroup.productIds = this.products
            .filter(product =>
                this.costGroup.productIds &&
                this.costGroup.productIds.length &&
                this.costGroup.productIds.includes(product.value))
            .map(value => value.value);

    }

    changeVehicleModelType() {
        this.customerTypes = [];
        this.allcustomerTypes.forEach((value: CustomerType) => {
            this.costGroup.vehicleModelTypes.forEach(type => {
                if (value.vehicleModelType === type || !this.costGroup.canSetVehicleModelTypes) {
                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.customerTypes.push(newVar);
                }
            });
        });

        this.costGroup.customerTypeIds = this.customerTypes
            .filter(customerType =>
                this.costGroup.customerTypeIds &&
                this.costGroup.customerTypeIds.length &&
                this.costGroup.customerTypeIds.includes(customerType.value))
            .map(value => value.value);
    }

    applyCustomerTypes() {
        this.customerTypes = [];
        this.allcustomerTypes.forEach((value: CustomerType) => {
            const newVar = {
                label: value.title,
                value: value.id
            };
            this.customerTypes.push(newVar);
        });
    }

    locationChanged(items) {
        if (!this.costGroup.canSetLocationIds) {
            this.costGroup.locationIds = [];
            items = [];
        }
        this.selectedLocation = items;
        this.setTitle();
    }

    chaneBoundaryLocation() {
        this.setTitle();
    }

    // گروه مشتری + نوع گروه هزینه + نوع مشتری + ستاد/منطقه/ناحیه (بالاترین انتخاب) + کاربرد هزینه  + (عنوان)
    setTitle() {
        if (!this.costGroup.id) {
            let title = '';

            if (this.costGroup.locationIds && this.costGroup.locationIds.length > 0) {
                if (this.costGroup.customerGroup !== this.CustomerGroup[CustomerGroup.BOUNDARY]) {
                    title += this.selectedLocation.filter(value => this.costGroup.locationIds.includes(value.id))
                        .map(value => value.name).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
                } else {
                    title += this.customLocation.filter(value => this.costGroup.locationIds.includes(value.value))
                        .map(value => value.label).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
                }
            }

            if (this.costGroup.costGroupType) {
                this.translateService.get('niopdcgatewayApp.CostGroupType.' + this.costGroup.costGroupType)
                    .subscribe(value => title += ' ' + value + ' ');
            }

            if (this.costGroup.customerGroup) {
                this.translateService.get('niopdcgatewayApp.CustomerGroup.' + this.costGroup.customerGroup)
                    .subscribe(value => title += ' ' + value + ' ');
            } else {
                this.translateService.get('niopdcgatewayApp.CustomerGroup.null')
                    .subscribe(value => title += ' ' + value + ' ');
            }

            // if (this.costGroup.customerTypeIds && this.costGroup.customerTypeIds.length > 0) {
            //     title += this.allcustomerTypes.filter((value) => this.costGroup.customerTypeIds.includes(value.id))
            //         .map((value) => value.title).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
            // }

            if (this.costGroup.costMethod && (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY] || this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.AIRPLANE])) {
                this.translateService.get('niopdcgatewayApp.CostMethod.' + this.costGroup.costMethod)
                    .subscribe(value => title += ' ' + value + ' ');
            }

            if (this.costGroup.subTitle) {
                title = title + '(' + this.costGroup.subTitle + ')';
            }
            this.costGroup.title = title;
        }
    }

    //endregion

    //region Cost
    changeCostAction() {

        if (this.costGroup.costCategory === this.CostCategory[CostCategory.WAGE] ||
            this.costGroup.cost.costAction === this.CostAction[CostAction.EFFECTLESS]) {
            this.costGroup.cost.effect = this.Effect[Effect.BASE];
            this.disabledEffect = true;
        } else {
            this.disabledEffect = false;
        }

        if (this.costGroup.cost.costAction === this.CostAction[CostAction.REDUCER]) {
            this.costGroup.cost.niopdcBankAccountTypeId = null;
        }

    }

    trackNiopdcBankAccountTypeById(index: number, item: NiopdcBankAccountType) {
        return item.id;
    }

    //endregion

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean) {
        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            this.costGroup.locationIds = this.costGroup.boundaryLocationIds;
        }

        this.isSaving = true;
        if (!this.costGroup.singleCost) {
            this.costGroup.cost.code = this.costGroup.code;
            this.costGroup.cost.productIds = this.costGroup.productIds;
            this.costGroup.cost.customerTypeIds = this.costGroup.customerTypeIds;
            this.costGroup.cost.vehicleModelTypes = this.costGroup.vehicleModelTypes;

            if (this.costGroup.cost.costAction === this.costAction[CostAction.REDUCER]) {
                this.costGroup.cost.costRelated = null;
            }
        }

        if (!this.costGroup.canSetCustomerTypeIds) {
            this.costGroup.customerTypeIds = null;
        }
        if (!this.costGroup.canSetProductIds) {
            this.costGroup.productIds = null;
        }

        if (!this.costGroup.canSetLocationIds) {
            this.costGroup.locationIds = null;
        }

        if (!this.costGroup.canSetVehicleModelTypes) {
            this.costGroup.vehicleModelTypes = null;
        }

        this.costGroup.contractTypes = null;
        this.costGroup.singleCost = !this.costGroup.singleCost;
        if (this.costGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costGroupService.update(this.costGroup));
        } else {
            this.subscribeToSaveResponse(
                this.costGroupService.create(this.costGroup), showNextLevel);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostGroup>>, showNextLevel ?: boolean) {
        result.subscribe((res: HttpResponse<CostGroup>) =>
            this.onSaveSuccess(res.body, showNextLevel), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostGroup, showNextLevel ?: boolean) {
        this.setLocations();
        this.eventManager.broadcast({name: 'costGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNextLevel) {
            setTimeout(() => {
                if (result.singleCost) {
                    this.router.navigateByUrl(`/cost-group/${result.id}/cost/${result.cost.id}/cost-rate)`);
                } else {
                    this.router.navigateByUrl(`/cost-group/${result.id}/cost(popup:new/cost-group/${result.id})`);
                }

            }, 1000);
        }
    }

    private onSaveError() {
        this.setLocations();
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cost-group-popup',
    template: ''
})
export class CostGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private costGroupPopupService: CostGroupPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.costGroupPopupService
                    .open(CostGroupDialogComponent as Component, params['id']);
            } else {
                this.costGroupPopupService
                    .open(CostGroupDialogComponent as Component);
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
