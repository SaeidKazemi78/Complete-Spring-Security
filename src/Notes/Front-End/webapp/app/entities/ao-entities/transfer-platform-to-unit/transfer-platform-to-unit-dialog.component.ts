import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {TransferPlatformToUnitPopupService} from './transfer-platform-to-unit-popup.service';
import {TransferPlatformToUnitService} from './transfer-platform-to-unit.service';
import {MetreLogService} from '../metre-log/index';
import {Metre, MetreService} from '../metre/index';
import {OilTank, OilTankService, OilTankType} from '../oil-tank/index';
import {DayDepot, DayDepotService} from '../day-depot/index';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SixtyConverter, SixtyDegreeConverterService} from '../../../shared/sixty-degree-converter/index';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';
import {SixtyBaseInformationService} from '../../sixty-base-information';

@Component({
    selector: 'jhi-transfer-platform-to-unit-dialog',
    templateUrl: './transfer-platform-to-unit-dialog.component.html'
})
export class TransferPlatformToUnitDialogComponent implements OnInit {

    transferPlatformToUnit: TransferPlatformToUnit;
    isSaving: boolean;
    isView: boolean;
    maxEndMetreNumber: number;
    metres: Metre[];
    metre: Metre;
    @ViewChild('editForm') editForm: NgForm;
    units: DayDepot[];
    platformTitle: string;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private sixtyConverterService: SixtyDegreeConverterService,
                private transferPlatformToUnitService: TransferPlatformToUnitService,
                private router: Router,
                private metreLogService: MetreLogService,
                private metreService: MetreService,
                private _hotkeysService: HotkeysService,
                private oilTankService: OilTankService,
                private dayDepotService: DayDepotService,
                private eventManager: JhiEventManager,
                private sixtyBaseInformationService: SixtyBaseInformationService,
                ) {
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'enter') {
                this.editForm.onSubmit(null);
                return false;
            }
        }));
        this._hotkeysService.add(new Hotkey(['ctrl+enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ctrl+enter') {
                this.save(true);
                return false;
            }
        }));
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (!this.transferPlatformToUnit.registerDate) {
            this.dayDepotService.getOpenDateTime(this.transferPlatformToUnit.platformId).subscribe(date => {
                this.transferPlatformToUnit.registerDate = date.body;
            });
        }
        if (this.transferPlatformToUnit.id) {
            this.metreService.find(this.transferPlatformToUnit.metreId)
                .subscribe(metre => {
                    this.metre = metre.body;
                    this.onChangeMetre(this.metre.id);
                });
        }
        this.dayDepotService.find(this.transferPlatformToUnit.platformId).subscribe(dayDepot => {
            this.platformTitle = dayDepot.body.oilTankTitle;
            this.metreService.getMetreActiveStatus(dayDepot.body.oilTankId)
                .subscribe(res => {
                    this.metres = res.body;
                },res => this.onError(res.message));
        });

        this.dayDepotService.queryByOilTankType(OilTankType[OilTankType.UNIT], this.transferPlatformToUnit.platformId)
            .subscribe(res => {
                this.units = res.body;
                if (this.units.length === 0) {
                    this.jhiAlertService.error('error.day.operation.close', null, null);
                }
            },res => this.onError(res.message));
        this.sixtyBaseInformationService.findByOther(this.transferPlatformToUnit.platformId, 'dayDepot')
            .subscribe(value => {
                this.transferPlatformToUnit.environmentTemperature = value.body.environmentTemperature;
                this.transferPlatformToUnit.productTemperature = value.body.productTemperature;
                this.transferPlatformToUnit.specialWeight = value.body.specialWeight;
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        this.transferPlatformToUnit.amount = this.transferPlatformToUnit.natureAmount;
        if (this.transferPlatformToUnit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferPlatformToUnitService.update(this.transferPlatformToUnit));
        } else {
            this.subscribeToSaveResponse(
                this.transferPlatformToUnitService.create(this.transferPlatformToUnit), showNext);
        }
    }

    onChangeAmount(data) {
        this.transferPlatformToUnit.natureAmount = Number(data);
        if (this.metre && this.transferPlatformToUnit.startMeter !== null) {
            this.transferPlatformToUnit.endMeter = this.transferPlatformToUnit.startMeter + this.transferPlatformToUnit.natureAmount;
        }
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    calculateQuantity60() {
        let model = new SixtyConverter();
        model.envTemp = this.transferPlatformToUnit.environmentTemperature;
        model.proTmp = this.transferPlatformToUnit.productTemperature;
        model.quantity = this.transferPlatformToUnit.natureAmount;
        model.speWei = this.transferPlatformToUnit.specialWeight;
        this.sixtyConverterService.getQuantity60Tank(model)
            .subscribe(res => {
                model = res.body;
                this.transferPlatformToUnit.sixtyAmount = res.body.quantity60;

            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransferPlatformToUnit>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<TransferPlatformToUnit>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransferPlatformToUnit, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'transferPlatformToUnitListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(
                    `/main-day-depot/${result.mainDayDepotId}/day-depot/${result.platformId}/transfer-platform-to-unit/(popup:new/${result.platformId})`
                );
            }, 1000);
        }
    }

    onChangeMetre(metreId: number) {
        this.metre = this.metres.find(value => value.id === metreId);
        this.transferPlatformToUnit.startMeter = this.metre.amount;
        if (this.transferPlatformToUnit.natureAmount) {
            this.transferPlatformToUnit.endMeter = this.transferPlatformToUnit.startMeter + this.transferPlatformToUnit.natureAmount;
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
    selector: 'jhi-transfer-platform-to-unit-popup',
    template: ''
})
export class TransferPlatformToUnitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transferPlatformToUnitPopupService: TransferPlatformToUnitPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.transferPlatformToUnitPopupService
                    .open(TransferPlatformToUnitDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                this.transferPlatformToUnitPopupService
                    .open(TransferPlatformToUnitDialogComponent as Component, null, params['dayDepotId']);
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
