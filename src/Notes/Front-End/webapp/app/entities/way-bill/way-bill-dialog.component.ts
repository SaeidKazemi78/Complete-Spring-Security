import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransferFuelType, WayBill, WayBillType} from './way-bill.model';
import {WayBillPopupService} from './way-bill-popup.service';
import {WayBillService} from './way-bill.service';
import {DayDepot, DayDepotService} from '../ao-entities/day-depot';
import {Depot, DepotService} from '../depot';
import {MainDayDepotService} from '../ao-entities/main-day-depot';
import {Person, PersonGroup, PersonService} from '../person';
import {Car, CarService} from '../car';
import {Driver, DriverService} from '../driver';
import {TransportContractService} from '../transport-contract';
import {Route, RouteService} from '../route';
import {SixtyConverter, SixtyDegreeConverterService} from '../../shared/sixty-degree-converter';
import {SealUse} from '../seal-use';
import {CarInfoService} from '../car-info';
import {SealService} from '../seal';
import {CarBakService} from '../car-bak';
import {Order, OrderService} from '../order';
import {OilTankType} from '../ao-entities/oil-tank';
import {Metre, MetreService} from '../ao-entities/metre';
import {RefuelCenterService} from '../ao-entities/refuel-center';

@Component({
    selector: 'jhi-way-bill-dialog',
    templateUrl: './way-bill-dialog.component.html'
})
export class WayBillDialogComponent implements OnInit {

    sealUses: SealUse[] = [];
    wayBill: WayBill;
    isSaving: boolean;
    isView: boolean;
    WayBillType = WayBillType;
    sourceDepot: Depot = new Depot();
    targetDepot: Depot = new Depot();
    mainDayDepotId: number;

    persons: Person[] = [];
    customPersons: any[];

    cars: Car[] = [];
    customCars: any[] = [];

    drivers: Driver[] = [];
    customDrivers: any[] = [];

    depots: Depot[] = [];
    customDepots: any[] = [];

    route: Route = new Route();

    PersonGroup = PersonGroup;
    TransferFuelType = TransferFuelType;
    isOrder: boolean;
    order: Order;
    dayDepots: DayDepot[];
    OilTankType = OilTankType;

    metres: Metre[];
    metre: Metre;
    dayDepot: DayDepot;
    maxDifferenceAmount: number | null;
    showMaxDifferenceAmount: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private wayBillService: WayBillService,
        private dayDepotService: DayDepotService,
        private eventManager: JhiEventManager,
        private depotService: DepotService,
        private activatedRoute: ActivatedRoute,
        private mainDayDepotService: MainDayDepotService,
        private personService: PersonService,
        private carService: CarService,
        private driverService: DriverService,
        private transportContractService: TransportContractService,
        private routeService: RouteService,
        private carInfoService: CarInfoService,
        private carBakService: CarBakService,
        private sealService: SealService,
        private sixtyDegreeService: SixtyDegreeConverterService,
        private orderService: OrderService,
        private metreService: MetreService,
        private refuelCenterService: RefuelCenterService
    ) {
    }

    ngOnInit() {
        this.isOrder = !!this.wayBill.orderId;
        this.isView = View.isView;
        this.isSaving = false;
        if (View.mode && !this.wayBill.id) {
            if (View.mode === 'received') {
                this.wayBill.wayBillType = this.WayBillType[this.WayBillType.RECEIVE];
                this.wayBill.receivedProductTemperature = 60;
                this.wayBill.receivedEnvironmentTemperature = 60;
                this.wayBill.sourceDepotId = 227;
                this.wayBill.targetDepotId = 262;
            } else {
                this.wayBill.wayBillType = this.WayBillType[this.WayBillType.SEND];
                this.wayBill.transferFuelType = this.TransferFuelType[this.TransferFuelType.TANKER];
                this.wayBill.targetDepotId = 227;
                this.wayBill.sourceDepotId = 262;
                this.wayBill.productTemperature = 60;
                this.wayBill.environmentTemperature = 60;
            }
        }

        if (this.wayBill.wayBillType === this.WayBillType[this.WayBillType.SEND]) {
            this.sealUses = this.wayBill.sealUses;
        }
        this.mainDayDepotId = View.mainDayDepotId;

        this.depotService.query()
            .subscribe(value => {
                this.depots = value.body;
                const depot = {
                    value: '',
                    label: ''
                };
                this.customDepots = [];
                this.customDepots.push(depot);
                for (let i = 0; i < this.depots.length; i++) {
                    this.customDepots.push({
                        value: this.depots[i].id,
                        label: this.depots[i].title
                    });
                }
                if (this.wayBill.id) {
                    this.sourceDepot = this.depots.find(value1 => value1.id === this.wayBill.sourceDepotId);
                    this.onChangeDepot(this.wayBill.sourceDepotId, this.wayBill.targetDepotId);
                    this.onChangeCar(this.wayBill.carId);
                } else {
                    this.onChangeDepot(this.wayBill.sourceDepotId, this.wayBill.targetDepotId);
                }
            });

        this.refuelCenterService.getMaxDifferenceAmountByDayDepotId(this.wayBill.dayDepotId)
            .subscribe(value => {
                this.maxDifferenceAmount = value.body;
            });

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.wayBill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.wayBillService.update(this.wayBill));
        } else {
            this.subscribeToSaveResponse(
                this.wayBillService.create(this.wayBill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WayBill>>) {
        result.subscribe((res: HttpResponse<WayBill>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WayBill) {
        this.eventManager.broadcast({name: 'wayBillListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    onChangePerson(personId) {
        this.carService.queryByHaveDrivers(null, personId)
            .subscribe(value => {
                this.cars = value.body;
            });
    }

    onChangeCar(carId) {
        if (!this.wayBill.id) {
            this.sealUses = [];
            this.carBakService.query(carId)
                .subscribe(value => {
                    if (!this.isOrder) {
                        this.sealService.findByDayDepotId(this.wayBill.dayDepotId)
                            .subscribe(sealRes => {
                                let counter = 0;
                                this.sealUses.push({
                                    sealNumber: sealRes.body.currentSealNumber,
                                    sealPrefix: sealRes.body.prefix,
                                    boxNo: sealRes.body.boxNo
                                });
                                for (let i = 0; i < value.body.length; i++) {
                                    counter = counter + 1;
                                    this.sealUses.push({
                                        sealNumber: sealRes.body.currentSealNumber + counter,
                                        sealPrefix: sealRes.body.prefix,
                                        boxNo: sealRes.body.boxNo
                                    });
                                }
                            });
                    } else {
                        this.sealService.findByRefuelCenterId(this.sourceDepot.refuelCenterId)
                            .subscribe(sealRes => {
                                let counter = 0;
                                this.sealUses.push({
                                    sealNumber: sealRes.body.currentSealNumber,
                                    sealPrefix: sealRes.body.prefix,
                                    boxNo: sealRes.body.boxNo
                                });
                                for (let i = 0; i < value.body.length; i++) {
                                    counter = counter + 1;
                                    this.sealUses.push({
                                        sealNumber: sealRes.body.currentSealNumber + counter,
                                        sealPrefix: sealRes.body.prefix,
                                        boxNo: sealRes.body.boxNo
                                    });
                                }
                            });
                    }
                });
        }
    }

    onChangeDepot(sourceDepotId, targetDepotId) {
        this.sourceDepot = this.depots.find(value => value.id === sourceDepotId);
        this.targetDepot = this.depots.find(value => value.id === targetDepotId);
        this.routeService.findBySourceAndTargetDepotCode(this.sourceDepot.code, this.targetDepot.code).subscribe(value => {
            this.route = value.body;
            this.wayBill.routeId = this.route.id;
        });
    }

    calculateSixty(type) {
        let model = new SixtyConverter();
        if (type === 'send') {
            model.envTemp = this.wayBill.environmentTemperature;
            model.proTmp = this.wayBill.productTemperature;
            model.quantity = this.wayBill.natureAmount;
            model.speWei = this.wayBill.specialWeight;
        } else {
            model.envTemp = this.wayBill.receivedEnvironmentTemperature;
            model.proTmp = this.wayBill.receivedProductTemperature;
            model.quantity = this.wayBill.receivedNatureAmount;
            model.speWei = this.wayBill.receivedSpecialWeight;

        }
        this.sixtyDegreeService.getQuantity60Tank(model)
            .subscribe(res => {
                model = res.body;
                if (type === 'send') {
                    this.wayBill.sixtyAmount = res.body.quantity60;
                } else {
                    this.wayBill.receivedSixtyAmount = res.body.quantity60;
                }
                this.changeAmount();
            });
    }

    changeDayDepot(dayDepotId) {
        this.metreService.queryByDayDepotId(dayDepotId)
            .subscribe(value => {
                this.metres = value.body;
                if (this.metres.length === 1) {
                    this.wayBill.metreId = this.metres[0].id;
                    this.changeMetre(this.wayBill.metreId);
                }
            });
    }

    changeMetre(metreId) {
        this.metre = this.metres.find(value => value.id === metreId);
        this.wayBill.startMeter = this.metre.amount;
        this.wayBill.endMeter = this.metre.amount + this.wayBill.natureAmount;
    }

    changeAmount() {
        if (this.wayBill.natureAmount && this.wayBill.sixtyAmount &&
            this.wayBill.receivedNatureAmount && this.wayBill.receivedSixtyAmount) {
            this.wayBill.differenceAmount = this.wayBill.receivedNatureAmount - this.wayBill.natureAmount;
            this.wayBill.differenceSixtyAmount = this.wayBill.receivedSixtyAmount - this.wayBill.sixtyAmount;
            if (Math.abs(this.wayBill.differenceSixtyAmount) > this.maxDifferenceAmount) {
                this.showMaxDifferenceAmount = true;
            } else {
                this.showMaxDifferenceAmount = false;
            }
        }
    }

    onChangeTransferType(transferType){

    }
}

@Component({
    selector: 'jhi-way-bill-popup',
    template: ''
})
export class WayBillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wayBillPopupService: WayBillPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['mode']) {
                View.mode = params['mode'];
            }
            if (params['mainDayDepotId']) {
                View.mainDayDepotId = params['mainDayDepotId'];
            }
            if (params['id']) {
                this.wayBillPopupService
                    .open(WayBillDialogComponent as Component, params['id'], null, null);
            } else if (params['dayDepotId']) {
                this.wayBillPopupService
                    .open(WayBillDialogComponent as Component, null, params['dayDepotId'], null);
            } else if (params['orderId']) {
                this.wayBillPopupService
                    .open(WayBillDialogComponent as Component, null, null, params['orderId']);
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
    static mainDayDepotId: number;
    static mode: string;
}
