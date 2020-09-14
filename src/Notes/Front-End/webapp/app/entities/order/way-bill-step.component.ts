import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Order, TypeOfFuelReceipt} from './order.model';
import {DayDepot, DayDepotService} from '../ao-entities/day-depot';
import {Metre, MetreService} from '../ao-entities/metre';
import {OilTankService, OilTankType} from '../ao-entities/oil-tank';
import {Router} from '@angular/router';
import {WayBill, WayBillService} from '../way-bill';
import {SealUse} from '../seal-use';
import {TransferFuelType, WayBillType} from '../way-bill/way-bill.model';
import {Depot, DepotService} from '../depot';
import {Person, PersonGroup} from '../person';
import {Car, CarService} from '../car';
import {Driver} from '../driver';
import {SixtyConverter, SixtyDegreeConverterService} from '../../shared/sixty-degree-converter';
import {CarBakService} from '../car-bak';
import {SealService} from '../seal';
import {ProductService} from '../product';

@Component({
    selector: 'jhi-way-bill-step',
    templateUrl: './way-bill-step.component.html'
})
export class WayBillStepComponent implements OnInit, OnDestroy {

    @Input() order: Order;
    wayBill: WayBill;
    OilTankType = OilTankType;
    TypeOfFuelReceipt = TypeOfFuelReceipt;
    sealUses: SealUse[] = [];
    WayBillType = WayBillType;
    sourceDepot: Depot = new Depot();
    mainDayDepotId: number;
    persons: Person[] = [];
    cars: Car[] = [];
    drivers: Driver[] = [];
    PersonGroup = PersonGroup;
    TransferFuelType = TransferFuelType;
    dayDepots: DayDepot[];

    metres: Metre[];
    metre: Metre;

    constructor(
        private depotService: DepotService,
        private dayDepotService: DayDepotService,
        private carService: CarService,
        private carBakService: CarBakService,
        private sealService: SealService,
        private sixtyDegreeService: SixtyDegreeConverterService,
        private metreService: MetreService,
        private wayBillService: WayBillService,
        private router: Router,
        private oilTankService: OilTankService,
        private productService: ProductService
    ) {

    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.wayBill = new WayBill();
        this.wayBillService.findByOrderId(this.order.id).subscribe(value => {
            if (value.body && value.body.id) {
                this.wayBill = value.body;
            } else {
                this.wayBill.orderId = this.order.id;
                this.wayBill.productTemperature = 60;
                this.wayBill.environmentTemperature = 60;
                this.wayBill.wayBillType = this.WayBillType[this.WayBillType.SEND];
                this.wayBill.transferFuelType = this.TransferFuelType[this.TransferFuelType.TANKER];
                this.wayBill.natureAmount = this.order.amount;
            }
        });

        this.depotService.find(this.order.depotId)
            .subscribe(depot => {
                this.sourceDepot = depot.body;
            });
        this.dayDepotService.queryMainDayDepotIdAndOilTankType(this.order.mainDayDepotId, this.OilTankType[this.OilTankType.PLATFORM])
            .subscribe(value => {
                this.dayDepots = value.body;
                this.dayDepots.forEach(dayDepot => {
                    this.oilTankService.find(dayDepot.oilTankId)
                        .subscribe(oilTank => {
                            this.productService.find(oilTank.body.productId)
                                .subscribe(product => {
                                    dayDepot.oilTankTitle = dayDepot.oilTankTitle + ' - ' + product.body.title;
                                });
                        });
                });
            });
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
                });
        }
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

    save() {
        this.wayBillService.create(this.wayBill).subscribe(value => {
            if (value.body) {
                this.router.navigateByUrl('/order?mode=refuel-center');
            }
        });
    }

}
