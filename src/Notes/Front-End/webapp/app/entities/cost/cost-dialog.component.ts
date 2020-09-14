import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Cost, CostAction, CostRelated, Effect, RateType} from './cost.model';
import {Location} from '../location/location.model';
import {CostPopupService} from './cost-popup.service';
import {CostService} from './cost.service';
import {CostGroup, CostGroupAccessType, CostGroupService, CostGroupType, CostMethod, CostCategory} from '../cost-group';
import {Product, ProductService} from '../product';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {ContractType} from '../sell-contract';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {VehicleModelType} from '../vehicle-model';
import {LocationService} from '../location';

@Component({
    selector: 'jhi-cost-dialog',
    templateUrl: './cost-dialog.component.html'
})
export class CostDialogComponent implements OnInit {

    CustomerGroup = CustomerGroup;
    CostCategory = CostCategory;
    CoustAction = CostAction;
    CostGroupType = CostGroupType;
    RateType = RateType;
    CostAction = CostAction;
    CostMethod = CostMethod;
    VehicleModelType = VehicleModelType;
    Effect = Effect;
    CostRelated = CostRelated;

    cost: Cost;
    parentCost: Cost;
    costGroup: CostGroup;

    isSaving: boolean;
    isView: boolean;
    disabledCostAction: boolean;
    disabledRateType: boolean;
    disabledEffect: boolean;
    costs: Cost[];

    niopdcbankaccountTypes: NiopdcBankAccountType[];

    products: any[];
    allproducts: any[];
    productsMapping = new Map();
    canSetProductIds: boolean;

    customerTypes: any[];
    tempCustomerTypes: any[];
    allcustomerTypes: any[];
    contractTypes: any[];
    allContractTypes: any[];
    disableProduct: boolean;

    costGroupAccessType: CostGroupAccessType;
    locations: Location [];
    customLocation: any[];
    vehicleModelTypeOptions: any[] = [];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private costService: CostService,
                private costGroupService: CostGroupService,
                private translateService: TranslateService,
                private router: Router,
                private locationService: LocationService,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private productService: ProductService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {

        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccountTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.isView = View.isView;
        this.isSaving = false;

        this.cost.canSetProductIds = this.cost.productIds && this.cost.productIds.length !== 0;
        this.cost.selectiveContractTypes = this.cost.contractTypes && this.cost.contractTypes.length !== 0;
        this.cost.canSetCustomerTypeIds = this.cost.customerTypeIds && this.cost.customerTypeIds.length !== 0;
        this.cost.canSetVehicleModelTypes = this.cost.vehicleModelTypes && this.cost.vehicleModelTypes.length !== 0;

        if (this.cost.parentId) {
            this.cost.effect = this.Effect[this.Effect.PARENT_COST];
            this.loadParentCost();
        } else if (this.cost.costGroupId) {
            this.loadCostGroup(this.cost.costGroupId);
        } else {
            this.router.navigate(['/cost-group']);
        }
    }

    loadParentCost() {
        this.costService.find(this.cost.parentId).subscribe((res: HttpResponse<Cost>) => {
            this.parentCost = res.body;
            this.loadCostGroup(this.parentCost.costGroupId);
        });

    }

    loadCostGroup(costGroupId) {
        this.costGroupService.find(costGroupId).subscribe((costGroup: HttpResponse<CostGroup>) => {
            this.costGroup = costGroup.body;

            this.allcustomerTypes = [];
            if (this.cost.parentId) {
                this.allcustomerTypes = this.parentCost.customerTypes;
            }
            if (!(this.allcustomerTypes && this.allcustomerTypes.length)) {
                this.allcustomerTypes = this.costGroup.customerTypes;
            }
            if (!(this.allcustomerTypes && this.allcustomerTypes.length)) {
                this.customerTypeService.queryByCustomerGroup(this.costGroup.customerGroup).subscribe(value => {
                    this.allcustomerTypes = value.body;
                    this.applyCustomerTypes();
                });
            } else {
                this.applyCustomerTypes();
            }

            const callbackMapperVehicleModelType = vmt => {
                return {
                    value: vmt,
                    label: this.translateService.instant('niopdcgatewayApp.VehicleModelType.' + vmt),
                };
            };
            this.vehicleModelTypeOptions = [];
            if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
                if (this.cost.parentId && this.parentCost.vehicleModelTypes && this.parentCost.vehicleModelTypes.length) {
                    this.vehicleModelTypeOptions = this.parentCost.vehicleModelTypes.map(callbackMapperVehicleModelType);
                }

                if (!(this.vehicleModelTypeOptions && this.vehicleModelTypeOptions.length)) {
                    this.vehicleModelTypeOptions = this.costGroup.vehicleModelTypes.map(callbackMapperVehicleModelType);
                }

                if (!(this.vehicleModelTypeOptions && this.vehicleModelTypeOptions.length)) {

                    for (const vmt in VehicleModelType) {
                        if (vmt !== this.VehicleModelType[VehicleModelType.AIRPLANE] && isNaN(parseInt(vmt, 10))) {
                            this.vehicleModelTypeOptions.push(callbackMapperVehicleModelType(vmt));
                        }
                    }
                }
                this.changeVehicleModelType();
            }

            this.setting();

        });
    }

    changeCanSetLocation() {
        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY] &&
            this.cost.canSetLocationIds &&
            !(this.locations && this.locations.length)) {
            this.locationService.queryByLevel(3).subscribe(value => {
                this.locations = value.body.filter(value1 => {
                    if (this.cost.parentId && this.parentCost.locationIds && this.parentCost.locationIds.length) {
                        return this.parentCost.locationIds.includes(value1.id);
                    } else if (this.cost.costGroupId && this.costGroup.locationIds && this.costGroup.locationIds.length) {
                        return this.costGroup.locationIds.includes(value1.id);
                    }
                    return true;
                });

                this.customLocation = this.locations.map(value1 => {
                    return {
                        value: value1.id,
                        label: value1.name
                    };
                });
            });
        }

    }

    changeCanSetProduct() {
        if (this.cost.canSetProductIds) {
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
                if (
                    (this.cost.parentId &&
                        (!(this.parentCost.productIds && this.parentCost.productIds.length) ||
                            this.parentCost.productIds.includes(value.id)))
                    ||
                    (this.cost.costGroupId &&
                        (!(this.costGroup.productIds && this.costGroup.productIds.length) ||
                            this.costGroup.productIds.includes(value.id)))
                ) {

                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.products.push(newVar);
                }
            });
        }

        this.costGroup.productIds = this.products
            .filter(product =>
                this.costGroup.productIds &&
                this.costGroup.productIds.length &&
                this.costGroup.productIds.includes(product.value))
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
        this.changeVehicleModelType();
    }

    changeVehicleModelType() {
        if (this.costGroup.customerGroup === this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            this.customerTypes = [];
            if (this.allcustomerTypes) {
                this.allcustomerTypes.forEach((value: CustomerType) => {
                    if (!this.cost.canSetVehicleModelTypes || (this.cost.vehicleModelTypes && this.cost.vehicleModelTypes
                        .find(type => value.vehicleModelType === type))) {
                        const newVar = {
                            label: value.title,
                            value: value.id
                        };
                        this.customerTypes.push(newVar);
                    }
                });

                this.costGroup.customerTypeIds = this.customerTypes
                    .filter(customerType =>
                        this.costGroup.customerTypeIds &&
                        this.costGroup.customerTypeIds.length &&
                        this.costGroup.customerTypeIds.includes(customerType.value))
                    .map(value => value.value);
            }
        }
    }

    setting() {
        if (this.costGroup.customerGroup !== this.CustomerGroup[CustomerGroup.BOUNDARY]) {
            this.cost.canSetVehicleModelTypes = false;
        }

        if (this.costGroup.costCategory === this.CostCategory[CostCategory.WAGE]) {
            this.cost.costAction = null;
        } else if (this.costGroup.costGroupType === this.CostGroupType[CostGroupType.ALPHA] ||
            this.costGroup.costGroupType === this.CostGroupType[CostGroupType.WAGE]) {
            this.cost.costAction = this.CostAction[CostAction.EFFECTLESS];
            this.disabledCostAction = true;
        } else {
            this.disabledCostAction = false;
        }
        if (this.costGroup.costGroupType === this.CostGroupType[this.CostGroupType.WAGE]) {
            this.cost.rateType = this.RateType[RateType.PERCENT];
        }
        this.changeCostAction();

        if (this.costGroup.costGroupType === this.CostGroupType[CostGroupType.ALPHA]) {
            this.cost.rateType = this.RateType[RateType.PERCENT];
            this.disabledRateType = true;
        } else {
            this.disabledRateType = false;
        }

    }

    changeCostAction() {
        if (this.costGroup.costCategory === this.CostCategory[CostCategory.WAGE] ||
            this.cost.costAction === this.CostAction[CostAction.EFFECTLESS]) {
            this.cost.effect = this.Effect[Effect.BASE];
            this.disabledEffect = true;
        } else {
            this.disabledEffect = false;
        }

        if (this.cost.costAction === this.CostAction[CostAction.REDUCER]) {
            this.cost.niopdcBankAccountTypeId = null;
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean, showNext ?: boolean) {
        if (this.cost.parentId) {
            this.cost.effect = this.Effect[Effect.PARENT_COST];
        }
        if (!this.cost.canSetCustomerTypeIds) {
            this.cost.customerTypeIds = null;
        }

        if (!this.cost.selectiveContractTypes) {
            this.cost.contractTypes = null;
        }
        this.isSaving = true;
        if (this.cost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costService.update(this.cost));
        } else {
            this.subscribeToSaveResponse(
                this.costService.create(this.cost), showNextLevel, showNext);
        }
    }

    trackNiopdcBankAccountTypeById(index: number, item: NiopdcBankAccountType) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cost>>, showNextLevel ?: boolean, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<Cost>) =>
            this.onSaveSuccess(res.body, showNextLevel, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cost, showNextLevel ?: boolean, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'costListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNextLevel) {
            setTimeout(() => {
                this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost/${result.id}/cost-rate(popup:new/${result.id})`);
            }, 1000);
        } else if (showNext) {
            if (result.parentId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost/${result.parentId}/cost(popup:new/cost/${result.parentId})`);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost(popup:new/cost-group/${result.costGroupId})`);
                }, 1000);
            }
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-cost-popup',
    template: ''
})
export class CostPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private costPopupService: CostPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.costPopupService
                    .open(CostDialogComponent as Component, params['id']);
            } else if (params['costId']) {
                this.costPopupService
                    .open(CostDialogComponent as Component, null, null, params['costId']);
            } else if (params['costGroupId']) {
                this.costPopupService
                    .open(CostDialogComponent as Component, null, params['costGroupId']);
            }  else {
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
