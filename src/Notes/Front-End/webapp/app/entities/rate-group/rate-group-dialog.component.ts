import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RateGroup, RateGroupType} from './rate-group.model';
import {RateGroupPopupService} from './rate-group-popup.service';
import {RateGroupService} from './rate-group.service';
import {RegionService} from '../region';
import {Region} from '../region/region.model';
import {CustomerType} from '../customer-type/customer-type.model';
import {CustomerTypeService} from '../customer-type/customer-type.service';
import {ContractType} from '../sell-contract';
import {TranslateService} from '@ngx-translate/core';
import {CustomerGroup} from '../customer-type';
import {LocationService} from '../location';
import {Product, ProductService} from '../product';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';

@Component({
    selector: 'jhi-rate-group-dialog',
    templateUrl: './rate-group-dialog.component.html'
})
export class RateGroupDialogComponent implements OnInit {

    rateGroup: RateGroup;
    isSaving: boolean;
    isView: boolean;

    customerTypes: any[];
    contractTypes: any[];
    allCustomerTypes: any[];
    allContractTypes: any[];
    regions: Region[] = [];
    ContractType = ContractType;
    disableFields: boolean;
    CustomerGroup = CustomerGroup;

    locations: any[];
    customLocation: any[];
    selectedLocation: any[];

    products: any[];
    allproducts: Product[];
    niopdcbankaccountTypes: NiopdcBankAccountType[];
    noneBundryLocationSelected: any;
    RateGroupType = RateGroupType;
    fob: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private locationService: LocationService,
        private jhiAlertService: JhiAlertService,
        private rateGroupService: RateGroupService,
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        private regionService: RegionService,
        private productService: ProductService,
        private customerTypeService: CustomerTypeService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {

    }

    ngOnInit() {
        this.isView = View.isView;

        if (this.rateGroup.archive || (this.rateGroup.contractTypes && this.rateGroup.contractTypes.indexOf('EXPORT') > -1)) {
            this.isView = true;
        }

        this.isSaving = false;
        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccountTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.allContractTypes = [];
        this.customerTypes = [];
        if (this.rateGroup.id) {
            if (this.rateGroup.type === this.RateGroupType[RateGroupType.FOB]) {
                this.rateGroup.type = this.RateGroupType[RateGroupType.NON_SUBSIDY];
                this.fob = true;
            }
            if (this.rateGroup.productIds && this.rateGroup.productIds.length !== 0) {
                this.rateGroup.canSetProductIds = true;
            } else {
                this.rateGroup.canSetProductIds = false;
            }
            this.rateGroupService.useBySellContractProduct(this.rateGroup.id, null)
                .subscribe(value => {
                    this.disableFields = value.body;
                    console.log(this.disableFields);
                });
        } else {
            this.rateGroup.foreignExchange = false;
        }
        for (const contractTypeKey in ContractType) {
            if (isNaN(parseInt(contractTypeKey, 10))) {
                this.allContractTypes.push(contractTypeKey);
            }
        }
        if (this.rateGroup.customerGroup != null) {
            this.customerTypeService.queryByCustomerGroup(this.rateGroup.customerGroup).subscribe(customerTypes => {
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
        this.contractTypes = [];
        this.allContractTypes.forEach((value: ContractType) => {

            this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe(title => {
                const newVar = {
                    label: title,
                    'value': value
                };
                this.contractTypes.push(newVar);
            });
        });

        console.log(this.contractTypes);

        this.productService.query().subscribe(products => {
            this.allproducts = products.body;
            this.products = [];
            this.allproducts.forEach((value: Product) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.products.push(newVar);
            });
        });

        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                // this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
                if (this.rateGroup.id) {
                    this.selectedLocation = this.rateGroup.locationIds;
                }
                this.setTitle();
            });

        /*this.customerTypeService.query().subscribe((customerTypes) => {
            this.allCustomerTypes = customerTypes.body;
            this.customerTypes = [];
            this.allCustomerTypes.forEach((value: CustomerType) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customerTypes.push(newVar);
            });
        });*/
    }

    locationChanged() {
        if (!this.rateGroup.locationIds || this.rateGroup.locationIds.length === 0) {
            this.regions = [];
        } else {
            this.regionService.queryByLocations(this.rateGroup.locationIds)
                .subscribe(res => {
                    this.regions = res.body;
                    this.setTitle();
                }, res => this.onError(res.message));
        }

    }

    onChangeVehicleModelType(value) {

        this.rateGroup.vehicleModelType = value;

        if (this.rateGroup.vehicleModelType != null) {
            this.customerTypeService.queryByCustomerGroupAndVehicleModelType(this.rateGroup.customerGroup, this.rateGroup.vehicleModelType).subscribe(customerTypes => {
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
        } else {

            this.customerTypeService.queryByCustomerGroup(this.rateGroup.customerGroup).subscribe(customerTypes => {
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

    }

    onLocationSelected(value) {
        this.noneBundryLocationSelected = '';
        if (value) {
            const setad = value.filter(loc => loc.parent === undefined);
            if (setad && setad.length === 1) {
                return this.noneBundryLocationSelected += setad[0].label;
            }

            const parent = value.filter(loc => !loc.leaf).map(loc => loc);
            let seprateLeafAndParent = '';
            if (parent && parent.length > 0) {

                this.noneBundryLocationSelected += parent.map(loc => loc.label)
                    .reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
                seprateLeafAndParent = ',';
            }
            this.noneBundryLocationSelected += seprateLeafAndParent + value.filter(loc => loc.leaf && !parent.includes(loc.parent))
                .map(loc => loc.label).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';

        }
    }

    setTitle() {

        let title = this.rateGroup.step ? ' پلکانی ' : '';

        if (this.rateGroup.step && this.rateGroup.paymentPeriod) {
            this.translateService.get('niopdcgatewayApp.PaymentPeriod.' + this.rateGroup.paymentPeriod)
                .subscribe(value => title += ' ' + value + ' ');
        }

        if (this.rateGroup.productIds && this.rateGroup.productIds.length) {
            title += this.products.filter(value => this.rateGroup.productIds.includes(value.value))
                .map(value => value.label).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
        }

        this.translateService.get('niopdcgatewayApp.CustomerGroup.' + this.rateGroup.customerGroup).subscribe(customerGroup => title += customerGroup);
        if (this.rateGroup.type) {
            this.translateService.get('niopdcgatewayApp.RateGroupType.' + this.rateGroup.type).subscribe(type => title = title + ' ' + type + ' ');
        }
        if (this.fob) {
            title += ' FOB';
        }
        if (this.rateGroup.foreignExchange) {
            title += ' ارزی ';
        }
        if (this.rateGroup.contractTypes && this.rateGroup.contractTypes.length) {
            title += ' ' + this.contractTypes.filter(value => this.rateGroup.contractTypes.includes(value.value))
                .map(value => value.label).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';
        }

        if (this.rateGroup.locationIds && this.rateGroup.customerGroup == CustomerGroup[CustomerGroup.BOUNDARY]) {
            title += ' ' + this.locations
                .filter(value => this.rateGroup.locationIds.includes(value.id))
                .map(value => value.name)
                .reduce((previousValue, currentValue) => previousValue + ', ' + currentValue) + ' ';

            // let boundrylocationselecte = this.customLocation.filter(loc => loc.value == this.selectedLocation[0]).map(loc => loc.label)[0];
            // title += ' ' + typeof (boundrylocationselecte) != undefined ? boundrylocationselecte : '';

        } else {
            if (this.noneBundryLocationSelected != undefined) {
                title += ' ' + this.noneBundryLocationSelected;
            }
        }

        if (this.rateGroup.rateTitle) {
            title = title + '(' + this.rateGroup.rateTitle + ')';
        }
        this.rateGroup.title = title;
    }

    onFobCheked(value) {
        this.setTitle();
    }

    onContractTypeChange(value) {
        this.setTitle();
    }

    onChangeType(value) {
        this.setTitle();

    }

    onForeignExchangeChecked(value) {
        this.setTitle();
    }

    onChangeCustomerGroup(value) {
        this.rateGroup.customerGroup = value;
        this.setTitle();

        if (value != '' && value != null) {
            this.rateGroup.customerTypeIds = null;

            if (value === 'BOUNDARY') {
                this.rateGroup.type = 'NON_SUBSIDY';
            } else {
                this.rateGroup.type = null;
            }

            this.customerTypeService.queryByCustomerGroup(value).subscribe(customerTypes => {
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

        } else {
            this.rateGroup.customerTypeIds = null;
            this.customerTypes = [];
            this.rateGroup.selectiveCustomerTypes = false;
        }

        this.loadContractType(value);

    }

    loadContractType(customerGroup) {
        let tempContractTypes = [];
        switch (customerGroup) {
            case 'All':
            case null:
                tempContractTypes = this.allContractTypes;
                break;
            case 'STATION':
            case 'SELLER':
                tempContractTypes = this.allContractTypes.filter(c => c === 'SUPPLY_CHANNEL' ||  c === 'BRAND');
                break;
            case 'MAJOR_CONSUMER':
                tempContractTypes = this.allContractTypes.filter(c => c === 'CONSUMER' || c === 'MILITARY');
                break;
            case 'AIRPLANE':
                tempContractTypes = this.allContractTypes.filter(c => c === 'AIRPLANE');
                break;
            case 'LIQUID_GAS':
                tempContractTypes = this.allContractTypes.filter(c => c === 'LIQUID_GAS');
                break;

        }
        this.contractTypes = [];
        tempContractTypes.forEach((value: ContractType) => {
            this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe(title => {
                const newVar = {
                    label: title,
                    'value': value
                };
                this.contractTypes.push(newVar);
            });
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {

        if (this.rateGroup.type === this.RateGroupType[RateGroupType.NON_SUBSIDY] && this.fob && !this.rateGroup.customerGroup) {
            this.rateGroup.type = this.RateGroupType[RateGroupType.FOB];
        }

        if (!(this.rateGroup.customerGroup === 'STATION' || this.rateGroup.customerGroup === 'SELLER')) {
            this.rateGroup.step = false;
        }

        this.isSaving = true;
        if (!this.rateGroup.canSetProductIds) {
            this.rateGroup.productIds = null;
        }
        if (!this.rateGroup.selectiveCustomerTypes) {
            this.rateGroup.customerTypeIds = null;
        }
        if (!this.rateGroup.selectiveContractTypes) {
            this.rateGroup.contractTypes = null;
        }
        if (this.rateGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rateGroupService.update(this.rateGroup));
        } else {
            this.subscribeToSaveResponse(
                this.rateGroupService.create(this.rateGroup));
        }
    }

    onChangeLocation(data) {
        this.rateGroup.locationIds = data;
        this.setTitle();
    }

    trackNiopdcBankAccountTypeById(index: number, item: NiopdcBankAccountType) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RateGroup>>) {
        result.subscribe((res: HttpResponse<RateGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RateGroup) {
        this.eventManager.broadcast({name: 'rateGroupListModification', content: 'OK'});
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
    selector: 'jhi-rate-group-popup',
    template: ''
})
export class RateGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateGroupPopupService: RateGroupPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.rateGroupPopupService
                    .open(RateGroupDialogComponent as Component, params['id']);
            } else {
                this.rateGroupPopupService
                    .open(RateGroupDialogComponent as Component);
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
