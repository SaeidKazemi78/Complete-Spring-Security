import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BoundaryDiscount} from './boundary-discount.model';
import {BoundaryDiscountPopupService} from './boundary-discount-popup.service';
import {BoundaryDiscountService} from './boundary-discount.service';
import {Product, ProductService} from '../product';
import {Location, LocationService} from '../location';
import {Country, CountryService} from '../country';
import {VehicleModel, VehicleModelService, VehicleModelType} from '../vehicle-model';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type';

@Component({
    selector: 'jhi-boundary-discount-dialog',
    templateUrl: './boundary-discount-dialog.component.html'
})
export class BoundaryDiscountDialogComponent implements OnInit {

    boundaryDiscount: BoundaryDiscount;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];
    customLocation: any[];
    selectedLocation: number;
    selectingLocation = true;

    countries: Country[];
    customerCountries: any[];
    selectedCountry;

    farCountry: boolean;
    countryTitle = '';
    currentCountry: Country;
    VehicleModelType = VehicleModelType;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private boundaryDiscountService: BoundaryDiscountService,
        private locationService: LocationService,
        private countryService: CountryService,
        private customerTypeService: CustomerTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        if (this.boundaryDiscount.id) {
            this.farCountry = !this.boundaryDiscount.country;
            if (this.boundaryDiscount.location) {
                this.selectingLocation = true;
            }
            else {  this.selectingLocation = false; }
        }
        this.loadLocation();
        this.loadCountries();

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {

        if (!this.selectingLocation) {
            this.boundaryDiscount.location = null;
        } else {
            this.boundaryDiscount.location = this.locations.find(value => value.id === this.selectedLocation);
        }

        if (this.farCountry) {
            this.boundaryDiscount.country = null;
        } else {
            this.boundaryDiscount.country = this.countries.find(value => value.id === this.selectedCountry);
        }

        this.isSaving = true;
        if (this.boundaryDiscount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.boundaryDiscountService.update(this.boundaryDiscount));
        } else {
            this.subscribeToSaveResponse(
                this.boundaryDiscountService.create(this.boundaryDiscount));
        }
    }

    private loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;

                this.customLocation = [];
                const option = {
                    label: '',
                    value: null
                };

                this.customLocation.push(option);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }

                if (this.boundaryDiscount.id && this.boundaryDiscount.location.id) {
                    this.selectedLocation = this.boundaryDiscount.location.id;
                    this.selectingLocation = true;
                }

            });
    }

    private loadCountries() {
        this.countryService.findAll()
            .subscribe(value => {
                this.countries = value.body;

                this.customerCountries = [];
                const option = {
                    label: '',
                    value: null
                };

                this.customerCountries.push(option);
                for (let i = 0; i < this.countries.length; i++) {
                    this.customerCountries.push({
                        value: this.countries[i].id,
                        label: this.countries[i].name + (this.countries[i].name !== this.countries[i].enName ? (' (' + this.countries[i].enName + ')') : '')
                    });
                }

                if (this.boundaryDiscount.id && this.boundaryDiscount.country.id) {
                    this.selectedCountry = this.boundaryDiscount.country.id;
                }

            });
    }

    onFarCountryChange(value: any) {
        if (value.currentTarget.checked) {
            this.countryTitle = '';
        } else {
            this.countryTitle = this.currentCountry.name;
        }

    }

    onChangeVehicleModelType(type) {
        if ( type === this.VehicleModelType[VehicleModelType.BUS] ) {
            this.selectingLocation = true;
            this.farCountry = false;
            this.selectedLocation = null;
            this.boundaryDiscount.location = null;
            this.selectedCountry = null ;
        }
    }

    onChangeLocation() {

        const find = this.locations.find(value => value.id === this.selectedLocation);
        if (find) {
            this.boundaryDiscount.location = find;
            this.selectedCountry = find.country.id;
        } else {
            this.boundaryDiscount.location = undefined;
        }

        /*this.locations.forEach((location) => {
            if (this.selectedLocation === location.id) {
                this.boundaryDiscount.location = location;
                this.boundaryDiscount.country = location.country;
                this.currentCountry = location.country;
                if (this.boundaryDiscount.location.country) {
                    this.countryTitle = this.boundaryDiscount.location.country.name;
                }

                if (this.boundaryDiscount.location.farCountry == undefined || this.boundaryDiscount.location.farCountry == null) {
                    this.farCountry = false;
                } else {
                    this.farCountry = this.boundaryDiscount.location.farCountry;
                }
                if (this.farCountry && (this.boundaryDiscount.country == null || this.boundaryDiscount.country == undefined)) {
                }

            }
            ;
        });*/
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BoundaryDiscount>>) {
        result.subscribe((res: HttpResponse<BoundaryDiscount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BoundaryDiscount) {
        this.eventManager.broadcast({name: 'boundaryDiscountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-boundary-discount-popup',
    template: ''
})
export class BoundaryDiscountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundaryDiscountPopupService: BoundaryDiscountPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.boundaryDiscountPopupService
                    .open(BoundaryDiscountDialogComponent as Component, params['id']);
            } else {
                this.boundaryDiscountPopupService
                    .open(BoundaryDiscountDialogComponent as Component);
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
