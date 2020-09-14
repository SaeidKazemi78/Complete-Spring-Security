import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {MeasurementOilTank} from './measurement-oil-tank.model';
import {MeasurementOilTankPopupService} from './measurement-oil-tank-popup.service';
import {MeasurementOilTankService} from './measurement-oil-tank.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {OilTank, OilTankService} from '../oil-tank';

@Component({
    selector: 'jhi-measurement-oil-tank-dialog',
    templateUrl: './measurement-oil-tank-dialog.component.html'
})
export class MeasurementOilTankDialogComponent implements OnInit {

    measurementOilTank: MeasurementOilTank;
    isSaving: boolean;
    isView: boolean;

    oiltanks: OilTank[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private measurementOilTankService: MeasurementOilTankService,
                private oilTankService: OilTankService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.measurementOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.measurementOilTankService.update(this.measurementOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.measurementOilTankService.create(this.measurementOilTank));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MeasurementOilTank>>) {
        result.subscribe((res: HttpResponse<MeasurementOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MeasurementOilTank) {
        this.eventManager.broadcast({name: 'measurementOilTankListModification', content: 'OK'});
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
    selector: 'jhi-measurement-oil-tank-popup',
    template: ''
})
export class MeasurementOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private measurementOilTankPopupService: MeasurementOilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.measurementOilTankPopupService
                    .open(MeasurementOilTankDialogComponent as Component, params['id']);
            } else {
                this.measurementOilTankPopupService
                    .open(MeasurementOilTankDialogComponent as Component);
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
