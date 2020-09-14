import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Order, TypeOfFuelReceipt} from './order.model';
import {FuelType, LogBook, LogBookService} from '../ao-entities/log-book';
import {DayDepot, DayDepotService} from '../ao-entities/day-depot';
import {Metre, MetreService} from '../ao-entities/metre';
import {MetreLog} from '../ao-entities/metre-log';
import {OilTankService, OilTankType} from '../ao-entities/oil-tank';
import {Router} from '@angular/router';
import {ProductService} from '../product';

@Component({
    selector: 'jhi-ticket-step',
    templateUrl: './ticket-step.component.html'
})
export class TicketStepComponent implements OnInit, OnDestroy {

    @Input() order: Order;
    logBook: LogBook;
    dayDepots: DayDepot[];
    FuelType = FuelType;
    metres: Metre[];
    OilTankType = OilTankType;
    TypeOfFuelReceipt = TypeOfFuelReceipt;

    constructor(
        private metreService: MetreService,
        private dayDepotService: DayDepotService,
        private logBookService: LogBookService,
        private oilTankService: OilTankService,
        private productService: ProductService,
        private router: Router
    ) {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.logBook = new LogBook();
        this.logBook.metreLog = new MetreLog();
        this.dayDepotService.queryMainDayDepotIdAndOilTankType(this.order.mainDayDepotId, this.OilTankType[this.OilTankType.PIPE])
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

    changeDayDepot(dayDepotId) {
        const dayDepot: DayDepot = this.dayDepots.find(value => dayDepotId === value.id);
        this.logBook.dayDepotId = dayDepotId;
        this.logBook.orderId = this.order.id;
        this.logBook.orderProductId = this.order.orderProducts[0].id;
        this.logBook.amount = this.order.amount;
        this.logBook.fuelType = this.FuelType[this.FuelType.RE_FUEL];
        this.logBook.status = true;
        this.logBook.orderNo = this.order.orderNo;
        this.logBook.metreLog.amount = this.order.amount;
        this.metreService.queryByDayDepotId(dayDepotId)
            .subscribe(value => {
                this.metres = value.body;
                if (this.metres.length === 1) {
                    this.logBook.metreLog.metreId = this.metres[0].id;
                    this.logBook.metreLog.registerDate = new Date();
                    this.getStartMetre();
                }
            });
    }

    getStartMetre() {
        if (this.logBook.metreLog.metreId != null && this.logBook.metreLog.registerDate != null) {
            this.metreService.getStartMetre(0, this.logBook.metreLog.metreId, this.logBook.metreLog.registerDate)
                .subscribe(startMetre => {
                    this.logBook.metreLog.startMeter = startMetre.body;
                    this.logBook.metreLog.endMeter = (+this.logBook.metreLog.startMeter) + (+this.order.amount);
                });
        }
    }

    save() {
        const logBookObj = {
            orderId: this.order.id,
            logBookDTOS: [
                this.logBook
            ]
        };
        this.logBookService.sync(logBookObj)
            .subscribe(value => {
                console.log(value);
                if (value.body) {
                    this.router.navigateByUrl('/order?mode=refuel-center');
                }
            });
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

}
