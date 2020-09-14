import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CarTank, TankType} from './car-tank.model';
import {CarTankPopupService} from './car-tank-popup.service';
import {CarTankService} from './car-tank.service';
import {Customer, CustomerService} from '../customer';

@Component({
    selector: 'jhi-car-tank-dialog',
    templateUrl: './car-tank-dialog.component.html'
})
export class CarTankDialogComponent implements OnInit {

    carTank: CarTank;
    isSaving: boolean;
    isView: boolean;
    TankType =  TankType;

    customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carTankService: CarTankService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if(!this.carTank.tankType) {
            this.carTank.tankType = this.TankType[this.TankType.CUBE];
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carTankService.update(this.carTank));
        } else {
            this.subscribeToSaveResponse(
                this.carTankService.create(this.carTank));
        }
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarTank>>) {
        result.subscribe((res: HttpResponse<CarTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarTank) {
        this.eventManager.broadcast({name: 'carTankListModification', content: 'OK'});
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
    selector: 'jhi-car-tank-popup',
    template: ''
})
export class CarTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTankPopupService: CarTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.carTankPopupService
                    .open(CarTankDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                this.carTankPopupService
                    .open(CarTankDialogComponent as Component, null, params['customerId']);
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
