import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Transfer} from './transfer.model';
import {TransferPopupService} from './transfer-popup.service';
import {TransferService} from './transfer.service';
import {MetreLog, MetreLogService} from '../metre-log/index';
import {ActiveMetre, TransferType, TransferTypeService} from '../../transfer-type/index';
import {OilTank, OilTankService, OilTankType} from '../oil-tank/index';
import {Metre, MetreService} from '../metre/index';
import {DayDepot, DayDepotService} from '../day-depot/index';
import {SixtyConverter, SixtyDegreeConverterService} from '../../../shared/sixty-degree-converter/index';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-transfer-dialog',
    templateUrl: './transfer-unit-to-dirty-dialog.component.html'
})
export class TransferUnitToDirtyDialogComponent implements OnInit {

    transfer: Transfer;
    isSaving: boolean;
    isView: boolean;
    emptyTargetOilTank: boolean;

    transfertypes: TransferType[];

    fromDayDepot: DayDepot;
    fromTitle: string;
    toDayDepots: DayDepot[];

    metres: Metre[];
    maxEndMetreNumber: number;
    amount: number;
    metre: Metre;
    @ViewChild('editForm') editForm: NgForm;
    daydepots: DayDepot[];
    activeMetre: ActiveMetre;
    disableSixtyDegree: boolean;
    disableTarget: boolean;
    startMetre: number;
    mainDayOperationId: number;
    unitDayDepots: DayDepot[] = [];
    dirtyDayDepots: DayDepot[] = [];
    OilTankType = OilTankType;
    unitIndex = 0;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private transferService: TransferService,
                private sixtyDegreeService: SixtyDegreeConverterService,
                private metreLogService: MetreLogService,
                private transferTypeService: TransferTypeService,
                private oilTankService: OilTankService,
                private _hotkeysService: HotkeysService,
                private metreService: MetreService,
                private router: Router,
                private dayDepotService: DayDepotService,
                private eventManager: JhiEventManager) {
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'enter') {
                this.editForm.onSubmit(null);
                return false;
            }
        }));
    }

    ngOnInit() {
        this.mainDayOperationId = View.mainDayOperationId;
        this.dayDepotService.queryMainDayOperationId(this.mainDayOperationId)
            .subscribe(value => {
                this.unitDayDepots = value.body;
                if (this.unitDayDepots && this.unitDayDepots.length > 0) {
                    this.transfer.fromDayDepotId = this.unitDayDepots[0].id;
                    this.onChangeFromDayDepot(this.transfer.fromDayDepotId);

                    this.transferTypeService.queryByFromAndToOilTankType(this.OilTankType[this.OilTankType.UNIT], this.OilTankType[this.OilTankType.CONTAMINATED])
                        .subscribe(res => {
                            this.transfertypes = res.body;
                        },res => this.onError(res.message));
                }
            });
        if (!this.transfer.id) {
            this.transfer.startMeter = 0;
            this.transfer.endMeter = 0;
        }
        if (this.transfer.id && this.transfer.metreId) {
            this.metreService.find(this.transfer.metreId)
                .subscribe(metre => {
                    this.metre = metre.body;
                    this.amount = this.transfer.endMeter - this.transfer.startMeter;
                });
        }
        this.isSaving = false;

        /*this.metreLogService
            .query({filter: 'transfer-is-null'})
            .subscribe((res: HttpResponse<MetreLog[]>) => {
                if (!this.transfer.metreLogId) {
                    this.metrelogs = res.body;
                } else {
                    this.metreLogService
                        .find(this.transfer.metreLogId)
                        .subscribe((subRes: HttpResponse<MetreLog>) => {
                            this.metrelogs = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));*/

        if (this.transfer.transferTypeId) {
            this.onChangeTransferType(null);
        }

    }

    onChangeFromDayDepot(fromDayDepotId) {
        if (this.transfer.registerDate == null) {
            this.dayDepotService.getOpenDateTime(fromDayDepotId).subscribe(date => {
                this.transfer.registerDate = date.body;
            });
        }
        this.dayDepotService.queryByOilTankType(this.OilTankType[this.OilTankType.CONTAMINATED], fromDayDepotId)
        // this.oilTankService.query({query: 'oilTankType#OilTankType.' + transferType.transferTo})
            .subscribe(res => {
                this.toDayDepots = res.body.filter(value => value.id !== fromDayDepotId);
                if (this.toDayDepots.length === 1) {
                    this.transfer.toDayDepotId = this.toDayDepots[0].id;
                }
                if (this.transfer.transferByMetre) {
                    this.onChangeTransferByMetre(this.transfer.transferByMetre);
                }
            },res => this.onError(res.message));
    }

    onChangeTransferType(data) {
        if (data) {
            this.transfer.transferByMetre = false;
            this.disableSixtyDegree = false;
            this.transfer.toDayDepotId = null;
            this.clearMetreData();
        }
        this.transferTypeService.find(this.transfer.transferTypeId).subscribe(transferType => {
            this.activeMetre = transferType.body.activeMetre;

            if (transferType.body.transferToHimself) {
                this.disableTarget = true;
                if (this.transfer.transferByMetre) {
                    this.onChangeTransferByMetre(this.transfer.transferByMetre);
                }
            } else {
                this.disableTarget = false;

                /* this.dayDepotService.queryByOilTankType(transferType.body.transferTo, this.transfer.fromDayDepotId)
                 // this.oilTankService.query({query: 'oilTankType#OilTankType.' + transferType.transferTo})
                     .subscribe((res) => {
                         this.toDayDepots = res.body.filter((value) => value.id !== this.transfer.fromDayDepotId);
                         if (this.toDayDepots.length === 1) {
                             this.transfer.toDayDepotId = this.toDayDepots[0].id;
                         }
                         if (this.transfer.transferByMetre) {
                             this.onChangeTransferByMetre(this.transfer.transferByMetre);
                         }
                     }, (res) => this.onError(res.message));*/
            }
        });
    }

    onChangeTransferByMetre(data) {
        if (data) {
            if (this.activeMetre.toString() === ActiveMetre[ActiveMetre.SOURCE]) {

                this.metreService.getMetreActiveStatus(this.fromDayDepot.oilTankId)
                    .subscribe(res => {
                        this.metres = res.body;
                    },res => this.onError(res.message));
            } else if (this.activeMetre.toString() === ActiveMetre[ActiveMetre.TARGET]) {
                const toDayDepot = this.toDayDepots.find(value => value.id === this.transfer.toDayDepotId);
                this.metreService.getMetreActiveStatus(toDayDepot.oilTankId)
                    .subscribe(res => {
                        this.metres = res.body;
                    },res => this.onError(res.message));
            }
            this.disableSixtyDegree = true;
        } else {
            this.clearMetreData();
        }
    }

    clearMetreData() {
        this.transfer.metreId = null;
        this.transfer.startMeter = 0;
        this.transfer.endMeter = 0;
        // this.transfer.sixtyAmount = 0;
        this.disableSixtyDegree = false;
    }

    onChangeTargetOilTank(data) {
        if (data !== '') {
            this.emptyTargetOilTank = false;
            this.transfer.transferByMetre = false;
        } else {
            this.emptyTargetOilTank = true;
        }
    }

    getStartMetre() {
        if (this.transfer.metreId != null && this.transfer.registerDate != null) {
            this.metreService.find(this.transfer.metreId)
                .subscribe(metre => {
                    this.metre = metre.body;
                    this.metreService.getStartMetre(this.transfer.metreId, this.transfer.metreLogId, this.transfer.registerDate)
                        .subscribe(startMetre => {
                            this.startMetre = startMetre.body;
                            this.transfer.startMeter = this.startMetre;
                            if (this.amount) {
                                const sum = Number(this.amount) + this.startMetre;
                                if (sum > this.metre.maxMetre) {
                                    const minus = sum - this.metre.maxMetre;
                                    this.amount -= minus;
                                }
                                this.transfer.endMeter = Number(this.amount) + this.transfer.startMeter;
                            }
                        });

                    this.maxEndMetreNumber = this.metre.maxMetre - this.metre.amount;
                });
        }
    }

    onChangeAmount(data) {
        this.amount = Number(data);
        if (this.metre) {
            this.transfer.endMeter = this.amount + this.transfer.startMeter;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.transfer.amount = this.transfer.natureAmount;
        this.transfer.specialWeight = 0.79;
        if (this.transfer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferService.update(this.transfer));
        } else {
            this.subscribeToSaveResponse(
                this.transferService.create(this.transfer));
        }
    }

    trackMetreLogById(index: number, item: MetreLog) {
        return item.id;
    }

    trackTransferTypeById(index: number, item: TransferType) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    calculateQuantity60() {
        let model = new SixtyConverter();
        model.envTemp = this.transfer.environmentTemperature;
        model.proTmp = this.transfer.productTemperature;
        model.quantity = this.transfer.natureAmount;
        model.speWei = this.transfer.specialWeight;
        this.sixtyDegreeService.getQuantity60Tank(model)
            .subscribe(res => {
                model = res.body;
                this.transfer.sixtyAmount = res.body.quantity60;
            });
        this.getStartMetre();
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Transfer>>) {
        result.subscribe((res: HttpResponse<Transfer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Transfer) {
        this.eventManager.broadcast({name: 'transferListModification', content: 'OK'});
        this.isSaving = false;
        this.unitIndex += 1;
        this.transfer = result;
        this.transfer.id = null;
        this.transfer.fromDayDepotId = this.unitDayDepots[this.unitIndex].id;
        this.transfer.natureAmount = 0;
        this.transfer.sixtyAmount = 0;
        /*this.activeModal.dismiss(result);*/
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-transfer-popup',
    template: ''
})
export class TransferUnitToDirtyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transferPopupService: TransferPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.transferPopupService
                .open(TransferUnitToDirtyDialogComponent as Component, null, null);
            View.mainDayOperationId = params['mainDayOperationId'];
            /* if (params['id']) {
                 this.transferPopupService
                     .open(TransferUnitToDirtyDialogComponent as Component, params['id']);
             } else if (params['dayDepotId']) {
                 this.transferPopupService
                     .open(TransferUnitToDirtyDialogComponent as Component, null, params['dayDepotId']);
             } else {
                 console.log('not be');
             }*/
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static mainDayOperationId: number;
}
