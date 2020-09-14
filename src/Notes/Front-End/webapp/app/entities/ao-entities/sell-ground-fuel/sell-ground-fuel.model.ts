import {BaseEntity} from '../../../shared/index';

export class SellGroundFuel implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public sellToDifferent?: boolean,
        public rate?: number,
        public totalPrice?: number,
        public dayDepotId?: number,
        public dayDepotTitle?: string,
        public mainDayDepotId?: number,
        public productRateId?: number,
    ) {
    }
}
