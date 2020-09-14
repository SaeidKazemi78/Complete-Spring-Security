import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CarRfId} from './car-rf-id.model';
import {CarRfIdPopupService} from './car-rf-id-popup.service';
import {CarRfIdService} from './car-rf-id.service';
import {Customer, CustomerService} from '../customer';
import {TagRate, TagRateService} from '../tag-rate';
import {LocationService} from 'app/entities/location';

@Component({
    selector: 'jhi-allocate-car-rf-id-dialog',
    templateUrl: './allocate-car-rf-id-dialog.component.html'
})
export class AllocateCarRfIdDialogComponent implements OnInit {

    active: boolean;
    carRfId: CarRfId;
    isSaving: boolean;
    isView: boolean;
    customerId: number;
    customLocation: any[];
    carRfIdOptions: any [];
    locationId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carRfIdService: CarRfIdService,
        private customerService: CustomerService,
        private tagRateService: TagRateService,
        private eventManager: JhiEventManager,
        private locationService: LocationService
    ) {
    }

    ngOnInit() {
        this.customerId = UsefulId.customerId;
        this.isView = View.isView;

        this.loadLocation();
        this.loadCaRfIds();

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.carRfId.active = this.active;

        this.subscribeToSaveResponse(
            this.carRfIdService.allocate(this.carRfId));
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarRfId>>) {
        result.subscribe((res: HttpResponse<CarRfId>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    loadCaRfIds() {
        this.carRfIdService.query({
            locationId: this.locationId,
            active: false
        }).subscribe(res => {
            const carRfIdOption = {
                value: '',
                label: ''
            };
            this.carRfIdOptions = [];
            this.carRfIdOptions.push(carRfIdOption);
            res.body.forEach((carRfId => {
                this.carRfIdOptions.push({
                    value: carRfId.id,
                    label: carRfId.code
                });
            }));
        });
    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                let locations = value.body;

                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                this.customLocation.push(location);
                for (let i = 0; i < locations.length; i++) {
                    this.customLocation.push({
                        value: locations[i].id,
                        label: locations[i].name
                    });
                }

            });
    }

    private onSaveSuccess(result: CarRfId) {
        this.eventManager.broadcast({name: 'carRfIdListModification', content: 'OK'});
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
    selector: 'jhi-car-rf-id-popup',
    template: ''
})
export class AllocateCarRfIdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carRfIdPopupService: CarRfIdPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.carRfIdPopupService
                    .open(AllocateCarRfIdDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                UsefulId.customerId = params['customerId'];
                this.carRfIdPopupService
                    .open(AllocateCarRfIdDialogComponent as Component, null, params['customerId']);
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
}

class UsefulId {
    static customerId: number;
    static locationId: number;
}
