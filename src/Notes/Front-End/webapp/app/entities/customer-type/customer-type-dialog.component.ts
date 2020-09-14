import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerGroup, CustomerType, LocationType} from './customer-type.model';
import {CustomerTypePopupService} from './customer-type-popup.service';
import {CustomerTypeService} from './customer-type.service';
import {VehicleModelService} from '../vehicle-model';

@Component({
    selector: 'jhi-customer-type-dialog',
    templateUrl: './customer-type-dialog.component.html'
})
export class CustomerTypeDialogComponent implements OnInit {

    regexCode = /^[\d]{4}$/;
    customerType: CustomerType;
    isSaving: boolean;
    isView: boolean;
    LocationType = LocationType;
    CustomerGroup = CustomerGroup;

    customerTypes: any[];
    selectedCustomerTypes: any[];

    vehicleModels: any[];
    selectedVehicleModel: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerTypeService: CustomerTypeService,
        private vehicleModelService: VehicleModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.customerType.id) {
            this.onChangeCustomerGroup(this.customerType.customerGroup);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerTypeService.update(this.customerType));
        } else {
            this.subscribeToSaveResponse(
                this.customerTypeService.create(this.customerType));
        }
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
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

    onChangeIgnoreCustomerType(data) {
        this.customerType.customerTypeIgnores = [];
        console.log(this.selectedCustomerTypes);
        for (let i = 0; i < this.selectedCustomerTypes.length; i++) {
            for (let j = 0; j < this.customerTypes.length; j++) {
                if (this.selectedCustomerTypes[i] === this.customerTypes[j].id) {
                    this.customerType.customerTypeIgnores[i] = this.customerTypes[j];
                }
            }
        }
    }

    onChangeCustomerGroup(data) {
        if (data && data === this.CustomerGroup[this.CustomerGroup.BOUNDARY]) {
            this.vehicleModelService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.BOUNDARY])
                .subscribe(value => {
                    this.vehicleModels = value.body;
                    for (let i = 0; i < this.vehicleModels.length; i++) {
                        this.vehicleModels[i].value = this.vehicleModels[i].id;
                        this.vehicleModels[i].label = this.vehicleModels[i].title;
                    }
                });
        }
    }

    onChangeLocationType() {
        if (this.customerType.locationType === this.LocationType[this.LocationType.FIXED]) {
            this.customerTypeService.query()
                .subscribe((res: HttpResponse<CustomerType[]>) => {
                    if (this.customerType.id) {
                        this.customerTypes = res.body.filter(value => value.id !== this.customerType.id);
                    } else {
                        this.customerTypes = res.body;
                    }
                    for (let i = 0; i < this.customerTypes.length; i++) {
                        this.customerTypes[i].value = this.customerTypes[i].id;
                        this.customerTypes[i].label = this.customerTypes[i].title;
                    }
                    if (this.customerType.id) {
                        this.selectedCustomerTypes = [];
                        for (let i = 0; i < this.customerType.customerTypeIgnores.length; i++) {
                            this.selectedCustomerTypes.push(this.customerType.customerTypeIgnores[i].id);
                        }
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
            if (this.customerType.id) {
                this.onChangeCustomerGroup(this.customerType.customerGroup);
            }
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerType>>) {
        result.subscribe((res: HttpResponse<CustomerType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerType) {
        this.eventManager.broadcast({name: 'customerTypeListModification', content: 'OK'});
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
    selector: 'jhi-customer-type-popup',
    template: ''
})
export class CustomerTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private customerTypePopupService: CustomerTypePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.customerTypePopupService
                    .open(CustomerTypeDialogComponent as Component, params['id']);
            } else {
                this.customerTypePopupService
                    .open(CustomerTypeDialogComponent as Component);
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
