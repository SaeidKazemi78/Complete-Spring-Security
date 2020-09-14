import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Customer} from './customer.model';
import {CustomerPopupService} from './customer-popup.service';
import {CustomerService} from './customer.service';
import {Country, CountryService} from '../country';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {Region, RegionService} from '../region';
import {Location, LocationService} from '../location';
import {Cost, CostService} from '../cost';
import {Depot, DepotService} from '../depot';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerGroup, LocationType} from '../customer-type/customer-type.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RemoteService} from '../../shared/remoteService/remote.service';
import {AirplaneModel, AirplaneModelService} from '../airplane-model';
import {VehicleModel, VehicleModelService} from '../vehicle-model';
import {RefuelCenterService} from '../ao-entities/refuel-center';
import {Principal} from "app/shared";

@Component({
    selector: 'jhi-customer-dialog',
    templateUrl: './customer-dialog.component.html'
})
export class CustomerDialogComponent implements OnInit {

    isTaxExempt: boolean;
    customertypes_all: CustomerType[];
    country: Country;
    customer: Customer;
    isSaving: boolean;

    isView: boolean;
    countries: Country[];

    customertypes: CustomerType[];
    airplaneModels: AirplaneModel[];
    customerType: CustomerType;
    LocationType = LocationType;

    regions: Region[];

    locations: Location[];
    location: Location = null;

    enterCode: any;

    customerGroup;
    CustomerGroup = CustomerGroup;
    regexCode = /^[\d]{10}$/;

    vehicleModels: VehicleModel[] = [];
    vehicleModelOptions = [];
    vehicleModel: VehicleModel = new VehicleModel();

    refuelCenters: any[];
    isCustomerTypeEdit: boolean;
    isAdmin: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private customerService: CustomerService,
                private countryService: CountryService,
                private customerTypeService: CustomerTypeService,
                private airplaneModelService: AirplaneModelService,
                private regionService: RegionService,
                private principal: Principal,
                private locationService: LocationService,
                private costService: CostService,
                private depotService: DepotService,
                private remoteService: RemoteService,
                private eventManager: JhiEventManager,
                private vehicleModelService: VehicleModelService,
                private refuelCenterService: RefuelCenterService,
                private translateService: TranslateService) {

    }

    onChangeCustomerGroup() {
        this.customertypes = this.customertypes_all.filter(value2 => value2.customerGroup === this.customerGroup);
        const custyomerType = this.customertypes.find(value2 => value2.id === this.customer.typeId);
        if (custyomerType == null) {
            this.customer.typeId = null;
        }
        if (this.customerGroup === this.CustomerGroup[this.CustomerGroup.AIRPLANE]) {
            this.loadVehicleModels();
            this.loadRefuelCenters();
        } else if (this.customerGroup === this.CustomerGroup[this.CustomerGroup.AIRPLANE] && !this.airplaneModels) {
            this.airplaneModelService.query().subscribe(res => {
                this.airplaneModels = res.body;
            }, res => this.onError(res.message));
        }
    }

    loadVehicleModels() {
        this.vehicleModelService.queryByCustomerGroup('AIRPLANE')
            .subscribe(res => {
                this.vehicleModels = res.body;

                this.vehicleModelOptions.push({
                    value: null,
                    label: ''
                });
                this.vehicleModels.forEach(value => {
                    this.vehicleModelOptions.push({
                        value: value.id,
                        label: value.title
                    });
                });

                if (this.customer.id && this.customer.vehicleModelId) {
                    this.onChangeVehicleModel(this.customer.vehicleModelId);
                }
            }, res => this.onError(res.message));
    }

    onChangeLocation() {
        this.loadRefuelCenters();
    }

    loadRefuelCenters() {
        if (this.location) {
            this.refuelCenterService.queryByLocation(this.location.id)
                .subscribe(res => {
                    this.refuelCenters = res.body.map(value => {
                        return {
                            label: value.persianTitle,
                            value: value.id,
                        };
                    });
                }, res => this.onError(res.message));
        }
    }

    onChangePostalCode() {
        if (this.customerGroup !== this.CustomerGroup[CustomerGroup.AIRPLANE] &&
            this.customerType && this.customerType.locationType !== this.LocationType[LocationType.MOVABLE] &&
            this.regexCode.test(this.customer.postalCode)) {
            this.remoteService.getAddressByPostcode(this.customer.postalCode).subscribe(value => {
                this.customer.address = value.body.address;
            }, (error1: HttpErrorResponse) => {
                this.onError(error1.message);
            });
        }
    }

    onChangeCustomerType(newValue) {
        this.customerType = this.customertypes.find(value => value.id === newValue);

        if (this.customerType) {
            this.isTaxExempt = (this.customerType.taxExempt);
            if (this.customerType.locationType.toString() === this.LocationType[this.LocationType.MOVABLE]
                || this.customerGroup === this.CustomerGroup[this.CustomerGroup.AIRPLANE]) {
                this.locationService.query(null).subscribe(value => {
                    this.customer.locations = value.body;
                });
            }
        } else {
            this.isTaxExempt = false;
        }

        if (!this.customer.address && this.customer.postalCode) {
            this.onChangePostalCode();
        }
    }

    ngOnInit() {
        this.principal.hasAuthority('ROLE_ADMIN')
            .then(value => {
                this.isAdmin = value.valueOf();
            });
        this.principal.hasAnyAuthority(['EDIT_CUSTOMER_CUSTOMER_TYPE_SUPPLY_CHANNEL'])
            .then(value => {
                if ((this.customer.customerGroupTitle === this.CustomerGroup[this.CustomerGroup.STATION] ||
                    this.customer.customerGroupTitle === this.CustomerGroup[this.CustomerGroup.SELLER]) && value) {
                    this.isCustomerTypeEdit = value.valueOf();
                }
            });
        this.principal.hasAnyAuthority(['EDIT_CUSTOMER_CUSTOMER_TYPE_CONSUMER'])
            .then(value => {
                if ((this.customer.customerGroupTitle === this.CustomerGroup[this.CustomerGroup.MAJOR_CONSUMER]) && value) {
                    this.isCustomerTypeEdit = value.valueOf();
                }
            });
        this.isSaving = false;
        this.isView = View.isView;
        if (this.customer.id) {
            if (this.customer.locations.length > 0) {
                this.location = this.customer.locations[0];
            }
        }
        this.ngLoad();

    }

    ngLoad() {
        this.customerTypeService.query().subscribe(res => {
            this.customertypes_all = res.body.filter(value => value.active);
            const find = this.customertypes_all.find((value, index, obj) => value.id === this.customer.typeId);
            let customerGroup = null;
            if (find) {
                customerGroup = find.customerGroup;
            }
            this.customerGroup = customerGroup;
            this.onChangeCustomerGroup();
            this.onChangeCustomerType(this.customer.typeId);
        }, res => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if ((this.enterCode || this.enterCode === true) && this.customerGroup !== this.CustomerGroup[this.CustomerGroup.AIRPLANE]) {
            this.customer.identifyCode = null;
        }
        if (this.location) {
            this.customer.locations = [];
            this.customer.locations.push(this.location);
        }
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
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

    onChangeProduct(data) {
        this.customer.productId = data;
    }

    onChangeVehicleModel(vehicleModelId) {
        this.vehicleModel = this.vehicleModels.find(value => value.id === vehicleModelId);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Customer>>) {
        result.subscribe((res: HttpResponse<Customer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Customer) {
        this.eventManager.broadcast({name: 'customerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-customer-popup',
    template: ''
})
export class CustomerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private customerPopupService: CustomerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {

            View.isView = !!params['view'];
            if (params['id']) {
                this.customerPopupService
                    .open(CustomerDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerDialogComponent as Component);
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
