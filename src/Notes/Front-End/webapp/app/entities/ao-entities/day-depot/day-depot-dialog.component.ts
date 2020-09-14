import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DayDepot} from './day-depot.model';
import {DayDepotPopupService} from './day-depot-popup.service';
import {DayDepotService} from './day-depot.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SixtyConverter, SixtyDegreeConverterService} from '../../../shared/sixty-degree-converter';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {MeasureType, OilTank, OilTankService, OilTankType} from '../oil-tank';
import {LiteratureVolumeOilTank, LiteratureVolumeOilTankService} from '../literature-volume-oil-tank';
import {MeasurementOilTankService} from '../measurement-oil-tank';
import {MainDayDepotService} from '../main-day-depot';
import {MainDayOperationService} from '../main-day-operation';
import {SixtyBaseInformationService} from "app/entities/sixty-base-information";

@Component({
    selector: 'jhi-day-depot-dialog',
    templateUrl: './day-depot-dialog.component.html'
})
export class DayDepotDialogComponent implements OnInit {

    dayDepot: DayDepot;
    haveOldDayDepot: boolean;
    isSaving: boolean;
    isView: boolean;
    literatureVolumeOilTanks: LiteratureVolumeOilTank[];
    OilTankType = OilTankType;
    MeasureType = MeasureType;
    oilTank: OilTank;
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
                private jhiAlertService: JhiAlertService,
                private dayDepotService: DayDepotService,
                private measurementOilTankService: MeasurementOilTankService,
                private oilTankService: OilTankService,
                private sixtyDegreeService: SixtyDegreeConverterService,
                private mainDayDepotService: MainDayDepotService,
                private mainDayOperationService: MainDayOperationService,
                private eventManager: JhiEventManager,
                private router: Router,
                private hotkeyService: HotkeyService,
                private _hotkeysService: HotkeysService,
                private sixtyBaseInformationService: SixtyBaseInformationService,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.hotkeyService.add('enter', null, this.editForm, false);
        this._hotkeysService.add(new Hotkey(['ctrl+enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ctrl+enter') {
                this.save(true);
                return false;
            }
        }));
        this.sixtyBaseInformationService.findByOther(this.dayDepot.id, 'dayDepot')
            .subscribe(value => {
                this.dayDepot.endMeasurementOilTankEnvironmentTemperature = value.body.environmentTemperature;
                this.dayDepot.endMeasurementOilTankProductTemperature = value.body.productTemperature;
                this.dayDepot.endMeasurementOilTankSpecialWeight = value.body.specialWeight;
            });
        this.isView = View.isView;
        this.isSaving = false;
        this.literatureVolumeOilTankService.queryByOilTankId(this.dayDepot.oilTankId)
            .subscribe(res => {
                this.literatureVolumeOilTanks = res.body;
            });
        if (this.dayDepot.id) {
            this.dayDepotService.isHaveOldDayDepot(this.dayDepot.id)
                .subscribe(value => {
                    this.haveOldDayDepot = value;
                });
        }
        this.oilTankService.find(this.dayDepot.oilTankId)
            .subscribe(value => this.oilTank = value.body);

        if (this.dayDepot.endMeasurementOilTankRegisterDate == null) {
            if (this.dayDepot.mainDayDepotDay != null) {
                this.dayDepot.endMeasurementOilTankRegisterDate = this.dayDepot.mainDayDepotDay;
            } else {
                this.dayDepot.endMeasurementOilTankRegisterDate = this.dayDepot.mainDayOperationDay;
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.oilTank.oilTankType === this.OilTankType[this.OilTankType.CONTAMINATED]) {
            this.dayDepot.endMeasurementOilTankSpecialWeight = 0.79;
            this.dayDepot.startMeasurementOilTankSpecialWeight = 0.79;
        }
        if (this.dayDepot.id) {
            if (this.dayDepot.mainDayOperationId) {
                this.dayDepot.endMeasurementOilTankSixtyAmount = this.dayDepot.endMeasurementOilTankAmountDeep;
                this.dayDepot.startMeasurementOilTankSixtyAmount = this.dayDepot.startMeasurementOilTankAmountDeep;
                this.dayDepot.endMeasurementOilTankSpecialWeight = 60;
                this.dayDepot.endMeasurementOilTankProductTemperature = 60;
                this.dayDepot.endMeasurementOilTankEnvironmentTemperature = 60;
                this.dayDepot.startMeasurementOilTankSpecialWeight = 60;
                this.dayDepot.startMeasurementOilTankProductTemperature = 60;
                this.dayDepot.startMeasurementOilTankEnvironmentTemperature = 60;
            }
            this.subscribeToSaveResponse(
                this.dayDepotService.update(this.dayDepot), showNext);
        } else {
            this.subscribeToSaveResponse(
                this.dayDepotService.create(this.dayDepot));
        }
    }

    onStartMeasurementOilTankAmountDeep(data) {
        let model = new SixtyConverter();
        if (this.dayDepot.mainDayOperationId) {
            model.envTemp = 60;
            model.proTmp = 60;
            model.speWei = 60;
        } else {
            model.envTemp = this.dayDepot.startMeasurementOilTankEnvironmentTemperature;
            model.proTmp = this.dayDepot.startMeasurementOilTankProductTemperature;
            model.speWei = this.dayDepot.startMeasurementOilTankSpecialWeight;
        }
        this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find(value => value.millimeter === data).id)
            .subscribe(res => {
                model = res.body;
                this.dayDepot.startMeasurementOilTankAmount = res.body.quantity;
                this.dayDepot.startMeasurementOilTankSixtyAmount = res.body.quantity60;
            });
    }

    onEndMeasurementOilTankAmountDeep(data) {
        let model = new SixtyConverter();
        if (this.dayDepot.mainDayOperationId) {
            model.envTemp = 60;
            model.proTmp = 60;
            model.speWei = 60;
        } else {
            model.envTemp = this.dayDepot.startMeasurementOilTankEnvironmentTemperature;
            model.proTmp = this.dayDepot.startMeasurementOilTankProductTemperature;
            model.speWei = this.dayDepot.startMeasurementOilTankSpecialWeight;
        }
        this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find(value => value.millimeter === data).id)
            .subscribe(res => {
                model = res.body;
                this.dayDepot.endMeasurementOilTankAmount = res.body.quantity;
                this.dayDepot.endMeasurementOilTankSixtyAmount = res.body.quantity60;
            });
    }

    refreshStart() {
        this.dayDepot.startMeasurementOilTankAmount = null;
        this.dayDepot.startMeasurementOilTankAmountDeep = null;
        this.dayDepot.startMeasurementOilTankSixtyAmount = null;
        this.dayDepot.startMeasurementOilTankSpecialWeight = null;
        this.dayDepot.startMeasurementOilTankProductTemperature = null;
        this.dayDepot.startMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepot.startMeasurementOilTankRegisterDate = null;
    }

    refreshEnd() {
        this.dayDepot.endMeasurementOilTankAmount = null;
        this.dayDepot.endMeasurementOilTankAmountDeep = null;
        this.dayDepot.endMeasurementOilTankSixtyAmount = null;
        this.dayDepot.endMeasurementOilTankSpecialWeight = null;
        this.dayDepot.endMeasurementOilTankProductTemperature = null;
        this.dayDepot.endMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepot.endMeasurementOilTankRegisterDate = null;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackMeasurementOilTankAmountDeepById(index: number, item: LiteratureVolumeOilTank) {
        return item.id;
    }

    onBlurStartDeep() {
        this.literatureVolumeOilTankService.calculateRatio(this.dayDepot.startMeasurementOilTankAmountDeep, this.dayDepot.oilTankId, null)
            .subscribe(value => {
                this.dayDepot.startMeasurementOilTankAmount = value.body;
                let model = new SixtyConverter();
                model.envTemp = this.dayDepot.startMeasurementOilTankEnvironmentTemperature;
                model.proTmp = this.dayDepot.startMeasurementOilTankProductTemperature;
                model.speWei = this.dayDepot.startMeasurementOilTankSpecialWeight;
                model.quantity = this.dayDepot.startMeasurementOilTankAmount;
                this.sixtyDegreeService.getQuantity60Tank(model)
                    .subscribe(res => {
                        model = res.body;
                        this.dayDepot.startMeasurementOilTankAmount = res.body.quantity;
                        this.dayDepot.startMeasurementOilTankSixtyAmount = res.body.quantity60;
                    });
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    onBlurEndDeep() {
        this.literatureVolumeOilTankService.calculateRatio(this.dayDepot.endMeasurementOilTankAmountDeep, this.dayDepot.oilTankId, null)
            .subscribe(value => {
                this.dayDepot.endMeasurementOilTankAmount = value.body;
                if (this.dayDepot.mainDayOperationId == null) {
                    let model = new SixtyConverter();
                    model.envTemp = this.dayDepot.endMeasurementOilTankEnvironmentTemperature;
                    model.proTmp = this.dayDepot.endMeasurementOilTankProductTemperature;
                    model.speWei = this.dayDepot.endMeasurementOilTankSpecialWeight;
                    model.quantity = this.dayDepot.endMeasurementOilTankAmount;
                    this.sixtyDegreeService.getQuantity60Tank(model)
                        .subscribe(res => {
                            model = res.body;
                            this.dayDepot.endMeasurementOilTankAmount = res.body.quantity;
                            this.dayDepot.endMeasurementOilTankSixtyAmount = res.body.quantity60;
                        });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DayDepot>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<DayDepot>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DayDepot, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'dayDepotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                if (result.mainDayDepotId != null) {
                    let id = 0;
                    this.dayDepotService.listOfIdMainDayDepotId(result.mainDayDepotId).subscribe(value => {
                        if (value.body.length > 0) {
                            id = value.body[0];
                            this.router.navigateByUrl(
                                `main-day-depot/${result.mainDayDepotId}/day-depot/(popup:${id}/edit)`
                            );
                        }
                    });

                } else {
                    let id = 0;
                    this.dayDepotService.listOfIdMainDayOperationId(result.mainDayOperationId).subscribe(value => {
                        if (value.body.length > 0) {
                            id = value.body[0];
                            this.router.navigateByUrl(
                                `main-day-operation/${result.mainDayOperationId}/day-depot/(popup:${id}/edit)`
                            );
                        }
                    });
                }
            }, 1000);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-day-depot-popup',
    template: ''
})
export class DayDepotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotPopupService: DayDepotPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.dayDepotPopupService
                    .open(DayDepotDialogComponent as Component, params['id']);
            } else if (params['mainDayDepotId']) {
                this.dayDepotPopupService
                    .open(DayDepotDialogComponent as Component, null, params['mainDayDepotId']);
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
