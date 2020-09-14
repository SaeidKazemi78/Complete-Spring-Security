import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CarRfId} from './car-rf-id.model';
import {CarRfIdPopupService} from './car-rf-id-popup.service';
import {CarRfIdService} from './car-rf-id.service';
import {Location, LocationService} from 'app/entities/location';

@Component({
    selector: 'jhi-car-rf-id-dialog',
    templateUrl: './car-rf-id-dialog.component.html'
})
export class CarRfIdDialogComponent implements OnInit {

    active: boolean;
    carRfId: CarRfId;
    isSaving: boolean;
    isView: boolean;
    customLocation: any[];
    locationId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carRfIdService: CarRfIdService,
        private eventManager: JhiEventManager,
        private locationService: LocationService
    ) {

    }

    ngOnInit() {

        this.locationId = Number(UsefulId.locationId);
        this.isView = View.isView;
        this.isSaving = false;
        this.loadLocation();

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carRfId.id !== undefined) {

            this.subscribeToSaveResponse(
                this.carRfIdService.update(this.carRfId));
        } else {
            this.subscribeToSaveResponse(
                this.carRfIdService.create(this.carRfId));
        }
    }

    loadLocation() {
        this.locationService.find(this.locationId)
            .subscribe((res: HttpResponse<Location>) => {
                this.customLocation = [];
                this.customLocation.push({
                    value: res.body.id,
                    label: res.body.name
                });
            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarRfId>>) {
        result.subscribe((res: HttpResponse<CarRfId>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarRfId) {
        this.eventManager.broadcast({name: 'carRfIdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-car-rf-id-popup',
    template: ''
})
export class CarRfIdPopupComponent implements OnInit, OnDestroy {

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
                UsefulId.locationId = params['locationId'];
                this.carRfIdPopupService
                    .open(CarRfIdDialogComponent as Component, params['id']);
            } else if (params['locationId']) {
                UsefulId.locationId = params['locationId'];
                this.carRfIdPopupService
                    .open(CarRfIdDialogComponent as Component, null, null, params['locationId']);
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
    static locationId: number;
}
