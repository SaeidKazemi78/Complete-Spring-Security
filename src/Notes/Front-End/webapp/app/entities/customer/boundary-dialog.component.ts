import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Customer} from './customer.model';
import {CustomerPopupService} from './customer-popup.service';
import {CustomerService} from './customer.service';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {Location} from '../location';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerGroup} from '../customer-type/customer-type.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RemoteService} from '../../shared/remoteService/remote.service';
import {Product, ProductService} from '../product';
import {VehicleModel, VehicleModelService, VehicleModelType} from '../vehicle-model';
import {Plaque} from '../plaque';
import {Principal} from '../../shared/auth/principal.service';
import {Country, CountryService} from '../country';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarRfIdService} from 'app/entities/car-rf-id';

@Component({
    selector: 'jhi-boundary-dialog',
    templateUrl: './boundary-dialog.component.html'
})
export class BoundaryDialogComponent implements OnInit {
    editForm = new FormGroup({
        customPlaque: new FormControl(undefined, Validators.required)
    });
    customer: Customer;
    isSaving: boolean;
    isView: boolean;
    carRfIdOptions: any [];

    vehicleModel: VehicleModel = new VehicleModel();
    VehicleModelType = VehicleModelType;

    CustomerGroup = CustomerGroup;
    vehicleModels: VehicleModel[] = [];
    customVehicleModels: any[];
    customerTypes: CustomerType[] = [];
    products: Product[];
    customProducts: any[];
    countries: Country[];
    customCountries: any[];
    isCustomerValid: boolean;
    isUserAdmin = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private customerService: CustomerService,
                private countryService: CountryService,
                private remoteService: RemoteService,
                private eventManager: JhiEventManager,
                private customerTypeService: CustomerTypeService,
                private productService: ProductService,
                private vehicleModelService: VehicleModelService,
                private translateService: TranslateService,
                private carRfIdService: CarRfIdService,
                private principal: Principal) {

        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'EDIT_PLUS_BOUNDARY_CUSTOMER']).then(result => {
            if (result) {
                this.isUserAdmin = true;
            }
        });

    }

    loadCustomerTypes() {
        this.customerTypeService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.BOUNDARY])
            .subscribe(value => {
                this.customerTypes = value.body;

                if (this.customer.id) {
                    this.onChangeCustomerType(this.customer.typeId);
                }

            });
    }

    loadVehicleModels() {
        if (!this.vehicleModels || !this.vehicleModels.length) {
            this.vehicleModelService.queryByCustomerGroup('BOUNDARY')
                .subscribe(res => {
                    this.vehicleModels = res.body;

                    this.loadCustomerTypes();

                }, res => this.onError(res.message));

        }
    }

    onChangeVehicleModel(vehicleModelId) {
        const vehicleModel = this.vehicleModels.find(value => value.id === vehicleModelId);
        this.customer.vehicleModelTitle = vehicleModel.title;
    }

    loadCaRfIds() {
        this.carRfIdService.getAllNoneActive().subscribe(res => {
            const carRfIdOption = {
                value: '',
                label: ''
            };
            this.carRfIdOptions = [];
            this.carRfIdOptions.push(carRfIdOption);
            res.body.forEach((carRfId => {
                this.carRfIdOptions.push({
                    value: carRfId.code,
                    label: carRfId.code
                });
            }));
        });
    }

    onChangeCustomerType(customerTypeId) {
        const customerType = this.customerTypes.find(value => value.id === customerTypeId);
        this.customer.iranian = customerType.iranian;
        if (!customerType.iranian) {
            this.customer.customPlaqueTwo = null;
        }
        if (customerType.iranian && this.countries) {
            const country = this.countries.find(value => value.checkNationalCode);
            if (country) {
                this.customer.countryId = country.id;
            }
        }

        this.customer.vehicleModelType = customerType.vehicleModelType;
        if (this.customer.typeId !== customerTypeId) {
            this.customer.vehicleModelId = null;
        }
        if (customerType.vehicleModelType !== VehicleModelType.CAR) {
            this.loadProducts();
        }

        const vehicleModels = this.vehicleModels.filter(value => value.vehicleModelType === customerType.vehicleModelType);

        const vehicleModel = {
            value: '',
            label: ''
        };
        let findVehicleModel = false;
        this.customVehicleModels = [];
        this.customVehicleModels.push(vehicleModel);
        for (let i = 0; i < vehicleModels.length; i++) {
            this.customVehicleModels.push({
                value: vehicleModels[i].id,
                label: vehicleModels[i].title + (vehicleModels[i].capacityInfo ? (' - ' + vehicleModels[i].capacityInfo) : '')
            });

            if (this.customer.vehicleModelId === vehicleModels[i].id) {
                findVehicleModel = true;
            }

        }

        if (this.customer.id && this.customer.vehicleModelId && findVehicleModel) {
            this.onChangeVehicleModel(this.customer.vehicleModelId);
        }

    }

    loadProducts() {
        if (!this.products) {
            this.productService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
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
                }, res => this.onError(res.message));
        }
    }

    ngOnInit() {
        this.isSaving = false;
        this.isView = View.isView;
        this.loadVehicleModels();
        this.principal.hasAnyAuthority(['ROLE_ADMIN', 'EDIT_PLUS_BOUNDARY_CUSTOMER']).then(result => {
            this.customer.used = false;
        });

        if (this.customer) {
            this.isCustomerValid = this.customer.valid;
        }

        this.countryService.findAll().subscribe(res => {
            this.countries = res.body;
            const country = {
                value: '',
                label: ''
            };
            this.customCountries = [];
            this.customCountries.push(country);
            for (let i = 0; i < this.countries.length; i++) {
                this.customCountries.push({
                    value: this.countries[i].id,
                    label: this.countries[i].name
                });
            }
        });

        this.loadCaRfIds();

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        this.customer.valid = this.isCustomerValid;
        /* if (this.customer.carRfId) {
             this.customer.carRfIds = [];
             this.customer.carRfIds.push({code: this.customer.carRfId, customerId: this.customer.id});
         }*/
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

    trackLocationById(index: number, item: Location) {
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

    onChangePlaque(plaque: Plaque, num) {
        if (plaque) {
            if (num === 1) {
                this.customer.plaqueTemplateCode = plaque.code;
                this.customer.plaqueTemplateTitle = plaque.title;
            } else if (num === 2) {
                this.customer.plaqueTwoTemplateCode = plaque.code;
                this.customer.plaqueTwoTemplateTitle = plaque.title;
            }
        }
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
    selector: 'jhi-boundary-popup',
    template: ''
})
export class BoundaryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private customerPopupService: CustomerPopupService) {
    }

    ngOnInit() {
        View.isBoundary = !!this.route.data['isBoundary'];
        this.routeSub = this.route.params.subscribe(params => {

            View.isView = !!params['view'];
            if (params['id']) {
                this.customerPopupService
                    .open(BoundaryDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(BoundaryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}

class View {
    static isView: boolean;
    static isBoundary: boolean;
}
