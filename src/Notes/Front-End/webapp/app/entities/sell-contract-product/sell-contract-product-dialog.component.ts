import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDateUtils, JhiEventManager} from 'ng-jhipster';

import {SellContractProduct, TypeOfFuelReceipt} from './sell-contract-product.model';
import {SellContractProductPopupService} from './sell-contract-product-popup.service';
import {SellContractProductService} from './sell-contract-product.service';
import {Consumption, ConsumptionService} from '../consumption';
import {ProductService} from '../product';
import {ContractType, SellContract, SellContractCustomer, SellContractService} from '../sell-contract';
import {Depot, DepotService} from '../depot';
import {Currency, CurrencyService} from '../currency';
import {CostGroupService} from '../cost-group';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {RateGroup, RateGroupService} from '../rate-group';
import {CustomerService} from '../customer';
import {BuyType, BuyTypeService} from '../buy-type';
import {CustomerGroup} from '../customer-type';
import {SelectItem} from 'primeng/api';
import {Forced} from '../cost-group/cost-group.model';
import {ConfigType} from '../niopdc-config';
import {SellContractCustomerService} from '../sell-contract/sell-contract-customer.service';
import {ProductSrcService} from 'app/entities/product-src';
import {NiopdcBankAccountTypeService} from 'app/entities/niopdc-bank-account-type';
import {ExportPi, ExportPiService} from 'app/entities/export-pi';

@Component({
    selector: 'jhi-sell-contract-product-dialog',
    templateUrl: './sell-contract-product-dialog.component.html'
})
export class SellContractProductDialogComponent implements OnInit {

    sellContractProduct: SellContractProduct;
    isSaving: boolean;
    isView: boolean;
    haveCustomer: boolean;

    consumptions: Consumption[];
    exportPis: ExportPi[];
    exportPi: ExportPi;

    customSellcontractcustomers: any[];

    currencyRateGroups: CurrencyRateGroup[];
    rateGroups: RateGroup[];
    tempRateGroups: RateGroup[] = [];

    depots: any;
    selectedDepots: number[];
    costGroups: SelectItem[];
    selectedCostGroups: number[];
    firstSelectedCostGroups: number[];
    currencies: Currency[];
    customCurrencies: any[];
    buyTypes: any = [];
    selectedBuyTypes: number[];
    productId;
    sellContractCustomer;

    typeOfFuelReceipts = [];

    CustomerGroup = CustomerGroup;

    customerGroup: any;
    sellContract: SellContract | null;
    ContractType = ContractType;
    allDepotCheck: boolean;

    customProductSrcs: any[];
    niopdcBankAccountTypes: any[];
    productSrcs: any;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private dateUtils: JhiDateUtils,
                private sellContractProductService: SellContractProductService,
                private exportPiService: ExportPiService,
                private consumptionService: ConsumptionService,
                private customerService: CustomerService,
                private productService: ProductService,
                private sellContractCustomerService: SellContractCustomerService,
                private sellContractService: SellContractService,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService,
                private depotService: DepotService,
                private costGroupService: CostGroupService,
                private productSrcService: ProductSrcService,
                private buyTypeService: BuyTypeService,
                private translateService: TranslateService,
                private currencyService: CurrencyService,
                private eventManager: JhiEventManager) {

    }

    ngOnInit() {
        if (!this.sellContractProduct.id) {
            this.sellContractProduct.currencyIds = [];
            this.currencyRateGroupService.findByConfig(ConfigType[ConfigType.NORMAL_SELL])
                .subscribe(value => {
                    this.sellContractProduct.currencyRateGroupId = value.body.id;
                });
        } else {
            this.productChanged(this.sellContractProduct.productId);
        }

        this.isView = View.isView;
        this.sellContractProduct.adjustment = View.isAdjustment;
        this.isSaving = false;
        this.sellContractService.find(this.sellContractProduct.sellContractId).subscribe(value => {
            this.sellContract = value.body;
            if (!this.sellContractProduct.id) {
                this.sellContractProduct.startDate = new Date(this.sellContract.startDate.setSeconds(this.sellContract.startDate.getSeconds() + 1));
                this.sellContractProduct.finishDate = new Date(this.sellContract.finishDate.setSeconds(this.sellContract.finishDate.getSeconds() - 1));
            }
            this.haveCustomer = !(this.sellContract.contractType === this.ContractType[ContractType.EXPORT]);
            if (!this.haveCustomer) {

                this.sellContractCustomerChanged(null);
                this.niopdcBankAccountTypeService.query().subscribe(value1 => {
                    this.niopdcBankAccountTypes = value1.body;
                });
            } else {
                this.customSellcontractcustomers = this.sellContract.sellContractCustomers.map(value1 => {
                    return {
                        value: value1.id,
                        label: value1.customerName,
                    };
                });

                if (this.sellContractProduct.id) {
                    this.sellContractCustomerChanged(this.sellContractProduct.sellContractCustomerId);
                    this.loadDefaultCostGroup(this.sellContractProduct.sellContractCustomerId, this.sellContractProduct.productId);
                } else if (this.customSellcontractcustomers && this.customSellcontractcustomers.length) {
                    this.sellContractProduct.sellContractCustomerId = this.customSellcontractcustomers[0].value;
                    this.sellContractCustomerChanged(this.customSellcontractcustomers[0].value);

                }
            }
        });

        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        for (const typeOfFuelReceiptKey in TypeOfFuelReceipt) {
            if (isNaN(parseInt(typeOfFuelReceiptKey, 10))) {
                this.translateService.get('niopdcgatewayApp.TypeOfFuelReceipt.' + typeOfFuelReceiptKey)
                    .subscribe(value => {
                        this.typeOfFuelReceipts.push({
                            value: typeOfFuelReceiptKey,
                            label: value
                        });
                    });
            }
        }
    }

    exportPiChange(event) {
        this.exportPi = this.exportPis.find(value => value.id = event);
        this.sellContractProduct.productId = this.exportPi ?  this.exportPi.productId : undefined;
        this.productChanged(this.sellContractProduct.productId);
    }

    changeCostGroup(event) {
        this.firstSelectedCostGroups.forEach(value => {
            if (!this.selectedCostGroups.includes(value)) {
                this.selectedCostGroups.push(value);
            }
        });
    }

    sellContractCustomerChanged(event) {
        const find = this.sellContract.sellContractCustomers ? this.sellContract.sellContractCustomers.find(value => event === value.id) : null;
        this.customerGroup = (find) ? find.customerGroup : 'EXPORT';

        if (!this.haveCustomer) {
            this.exportPiService.findBySellContract(this.sellContract.id).subscribe(req => {
                this.exportPis = req.body;
            });
        }

        ((!this.haveCustomer) ? this.depotService.queryBySellContract(this.sellContract.id) :
            this.depotService.queryByLocationAndContractType((find) ? find.locationId : -1, this.sellContract.contractType))
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body.map(p => {
                    return {label: p.title, value: p.id};
                });
                if (this.sellContractProduct.id) {
                    this.selectedDepots = this.sellContractProduct.depots.map(i => i.id);
                    console.log(this.selectedDepots);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.sellContract && this.haveCustomer) {
            this.rateGroupService.queryByContractTypeAndCustomer(this.sellContract.contractType,
                find ? find.customerId : null,
                find ? [find.locationId] : [this.sellContract.locationId])
                .subscribe((res: HttpResponse<RateGroup[]>) => {
                    this.rateGroups = res.body;
                    this.tempRateGroups = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
        if (!this.sellContractProduct.id) {
            this.loadDefaultCostGroup(event, this.productId);
        }
        this.loadConsumption(this.sellContractProduct.productId, event);
        this.loadCurrency();
        this.buyTypeService.queryForSellContractProduct(this.haveCustomer ? find.customerId : null)
            .subscribe((res: HttpResponse<BuyType[]>) => {
                this.buyTypes = res.body.map(p => {
                    return {label: p.title, value: p.id};
                });
                if (this.sellContractProduct.id) {
                    this.selectedBuyTypes = this.sellContractProduct.buyTypes.map(i => i.id);
                }

            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.sellContractProduct.niopdcBankAccountTypeId && this.niopdcBankAccountTypes && this.niopdcBankAccountTypes.length) {
            this.sellContractProduct.niopdcBankAccountTypeTitle = this.niopdcBankAccountTypes.find(item => item.id === this.sellContractProduct.niopdcBankAccountTypeId).title;
        }
        if (this.allDepotCheck && this.sellContract.contractType === this.ContractType[ContractType.AIRPLANE]) {
            this.selectedDepots = this.depots.map(i => i.value);
        } else if (this.sellContract.contractType === this.ContractType[ContractType.AIRPLANE]) {
            this.selectedDepots = null;
        }

        this.sellContractProduct.depots = this.selectedDepots ? this.selectedDepots.map(i => {
            return new Depot(i);
        }) : [];

        this.sellContractProduct.costGroupIds = this.selectedCostGroups ? this.selectedCostGroups : [];

        this.sellContractProduct.buyTypes = this.selectedBuyTypes ? this.selectedBuyTypes.map(i => new BuyType(i)) : [];

        this.isSaving = true;
        if (this.sellContractProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractProductService.update(this.sellContractProduct));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractProductService.create(this.sellContractProduct));
        }
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<SellContractProduct>>) {
        result.subscribe((res: HttpResponse<SellContractProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    trackConsumptionById(index: number, item: Consumption) {
        return item.id;
    }

    trackSellContractCustomerById(index: number, item: SellContractCustomer) {
        return item.id;
    }

    trackexportPiById(index: number, item: ExportPi) {
        return item.id;
    }

    trackrateGroupById(index: number, item: RateGroup) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    productChanged(productId) {
        this.sellContractProduct.productId = productId;
        if (!this.sellContractProduct.id) {
            this.loadDefaultCostGroup(this.sellContractCustomer, this.sellContractProduct.productId);
        }
        this.loadConsumption(this.sellContractProduct.productId, this.sellContractProduct.sellContractCustomerId);

        if (!this.haveCustomer) {
            if (!this.sellContractProduct.productId) {
                this.customProductSrcs = [];
            } else {
                this.customProductSrcs = [];
                this.productSrcService.query({'productId': this.sellContractProduct.productId})
                    .subscribe(res => {

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

                    }, res => this.onError(res.message));
            }
        }
        this.loadRateGroup(productId);
    }

    loadRateGroup(productId) {
        this.rateGroups = this.tempRateGroups.filter(rateGroup => rateGroup.productRates.find(productRate => productRate.productId === productId));
    }

    onChangeTypeOfFuelReceipt(data) {
        // this.sellContractProduct.typeOfFuelReceipts = data.value;
        console.log(this.sellContractProduct);
    }

    loadCurrency() {
        this.currencyService.queryCache()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                this.customCurrencies = res.body.map(p => {
                    return {label: p.title, value: p.id};
                });

            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    loadConsumption(productId, sellContractCustomerId) {
        if (productId && (!this.haveCustomer || sellContractCustomerId)) {
            const sellContractCustomer = (this.haveCustomer) ?
                this.sellContract.sellContractCustomers.find(value => value.id === sellContractCustomerId) :
                {customerId: null};
            this.consumptionService.queryByProductAndCustomer(productId, sellContractCustomer.customerId)
                .subscribe((res: HttpResponse<Consumption[]>) => {
                    this.consumptions = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    private onSaveSuccess(result: SellContractProduct) {
        this.eventManager.broadcast({name: 'sellContractProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private loadDefaultCostGroup(sellContractCustomer, productId) {
        this.productId = productId;
        this.sellContractCustomer = sellContractCustomer;
        if (this.productId && (!this.haveCustomer || this.sellContractCustomer) && this.sellContract && this.sellContract.contractType) {
            const find = this.sellContract.sellContractCustomers.find(value => sellContractCustomer === value.id);

            (this.haveCustomer ?
                this.costGroupService.queryLoadDefaultByProductAndLocationAndCustomerAndContractType(
                    this.productId, find.locationId, find.customerTypeId, this.sellContract.contractType, this.customerGroup) :
                this.costGroupService.queryLoadDefaultByProductAndContractTypeAndLocations(
                    this.productId, this.sellContract.contractType, this.sellContract.locationIds))
                .subscribe(res => {
                        this.costGroups = res.body.map(p => {
                            return {label: p.title, value: p.id};
                        });
                        this.selectedCostGroups = res.body
                            .filter(value => value.forced === Forced[Forced.FORCE])
                            .map(value => value.id);
                        this.firstSelectedCostGroups = this.selectedCostGroups;

                        if (this.sellContractProduct.id) {
                            this.selectedCostGroups = this.sellContractProduct.costGroupIds.map(i => i);
                        }
                    }
                );
        }
    }
}

@Component({
    selector: 'jhi-sell-contract-product-popup',
    template: ''
})
export class SellContractProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private sellContractProductPopupService: SellContractProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = params['view'] === 'view';
            View.isAdjustment = params['view'] === 'adjustment';

            if (params['id']) {
                this.sellContractProductPopupService
                    .open(SellContractProductDialogComponent as Component, params['id']);
            } else if (params['sellContractId']) {
                this.sellContractProductPopupService
                    .open(SellContractProductDialogComponent as Component, null, params['sellContractId']);
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
