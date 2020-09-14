import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultPopupService} from './request-test-result-popup.service';
import {RequestTestResultService} from './request-test-result.service';
import {OilTank, OilTankService} from '../oil-tank/index';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/index';

@Component({
    selector: 'jhi-request-test-result-dialog',
    templateUrl: './request-test-result-dialog.component.html'
})
export class RequestTestResultDialogComponent implements OnInit {

    requestTestResult: RequestTestResult;
    isSaving: boolean;
    isView: boolean;
    oiltanks: OilTank[];

    refuelcenters: RefuelCenter[];
    oiltank: OilTank;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private requestTestResultService: RequestTestResultService,
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
        if (this.requestTestResult.id != null) {
            this.oilTankService.queryByRefuelCenterByUnit(this.requestTestResult.refuelCenterId)
                .subscribe(res => {
                    this.oiltanks = res.body;
                    this.onChangeOilTank(this.requestTestResult.oilTankId);
                },res => this.onError(res.message));
        }
    }

    onChangeRefuelCenter(data) {
        this.oiltanks = [];
        this.requestTestResult.oilTankId = null;
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
            this.requestTestResult.productId = this.oiltank.productId;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectOilTank(oilTank) {
        console.log(oilTank);
    }

    save() {
        this.isSaving = true;
        if (this.requestTestResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestTestResultService.update(this.requestTestResult));
        } else {
            this.subscribeToSaveResponse(
                this.requestTestResultService.create(this.requestTestResult));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestTestResult>>) {
        result.subscribe((res: HttpResponse<RequestTestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestTestResult) {
        this.eventManager.broadcast({name: 'requestTestResultListModification', content: 'OK'});
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
    selector: 'jhi-request-test-result-popup',
    template: ''
})
export class RequestTestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestTestResultPopupService: RequestTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestTestResultPopupService
                    .open(RequestTestResultDialogComponent as Component, params['id']);
            } else {
                this.requestTestResultPopupService
                    .open(RequestTestResultDialogComponent as Component);
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
