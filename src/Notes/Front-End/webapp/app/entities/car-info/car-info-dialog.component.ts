import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarInfo } from './car-info.model';
import { CarInfoPopupService } from './car-info-popup.service';
import { CarInfoService } from './car-info.service';
import { Car, CarService } from '../car';

@Component({
    selector: 'jhi-car-info-dialog',
    templateUrl: './car-info-dialog.component.html'
})
export class CarInfoDialogComponent implements OnInit {

    carInfo: CarInfo;
    isSaving: boolean;
    isView: boolean;

        car: Car[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carInfoService: CarInfoService,
        private carService: CarService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.carService.query()
            .subscribe((res: HttpResponse<Car[]>) => { this.car = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carInfoService.update(this.carInfo));
        } else {
            this.subscribeToSaveResponse(
                this.carInfoService.create(this.carInfo));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<CarInfo>>) {
        result.subscribe((res: HttpResponse<CarInfo>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: CarInfo) {
        this.eventManager.broadcast({ name: 'carInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackCarById(index: number, item: Car) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-car-info-popup',
    template: ''
})
export class CarInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carInfoPopupService: CarInfoPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.carInfoPopupService
                    .open(CarInfoDialogComponent as Component, params['id']);
            } else if (params['carId'])  {
                this.carInfoPopupService
                    .open(CarInfoDialogComponent as Component, null, params['carId']);
            } else { console.log('not be'); }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
