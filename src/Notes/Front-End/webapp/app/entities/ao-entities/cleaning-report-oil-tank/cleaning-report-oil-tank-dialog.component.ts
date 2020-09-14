import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankPopupService} from './cleaning-report-oil-tank-popup.service';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';
import {OilTank, OilTankService} from '../oil-tank';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';

@Component({
    selector: 'jhi-cleaning-report-oil-tank-dialog',
    templateUrl: './cleaning-report-oil-tank-dialog.component.html'
})
export class CleaningReportOilTankDialogComponent implements OnInit {

    cleaningReportOilTank: CleaningReportOilTank;
    isSaving: boolean;
    isView: boolean;

    oiltanks: OilTank[];

    refuelcenters: RefuelCenter[];
    oiltank: OilTank;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cleaningReportOilTankService: CleaningReportOilTankService,
        private oilTankService: OilTankService,
        private refuelCenterService: RefuelCenterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.oiltank = new OilTank();
        this.refuelCenterService.query()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelcenters = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.cleaningReportOilTank.id != null) {
            this.oilTankService.queryByRefuelCenterByUnit(this.cleaningReportOilTank.refuelCenterId)
                .subscribe(res => {
                    this.oiltanks = res.body;
                    this.onChangeOilTank(this.cleaningReportOilTank.oilTankId);
                },res => this.onError(res.message));
        }
    }

    onChangeRefuelCenter(data) {
        this.oiltanks = [];
        this.cleaningReportOilTank.oilTankId = null;
        if (data) {
            this.oilTankService.queryByRefuelCenterByUnit(data)
                .subscribe(res => {
                    this.oiltanks = res.body;
                },res => this.onError(res.message));
        }
    }

    onChangeOilTank(data) {
        this.oilTankService.find(data).subscribe(value => {
            this.oiltank = value.body;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cleaningReportOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cleaningReportOilTankService.update(this.cleaningReportOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.cleaningReportOilTankService.create(this.cleaningReportOilTank));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CleaningReportOilTank>>) {
        result.subscribe((res: HttpResponse<CleaningReportOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CleaningReportOilTank) {
        this.eventManager.broadcast({name: 'cleaningReportOilTankListModification', content: 'OK'});
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
    selector: 'jhi-cleaning-report-oil-tank-popup',
    template: ''
})
export class CleaningReportOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cleaningReportOilTankPopupService: CleaningReportOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.cleaningReportOilTankPopupService
                    .open(CleaningReportOilTankDialogComponent as Component, params['id']);
            } else {
                this.cleaningReportOilTankPopupService
                    .open(CleaningReportOilTankDialogComponent as Component);
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
