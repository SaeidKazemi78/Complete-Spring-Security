import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class AircraftRefuelingRecord {
    constructor(
        public receiptNo: string,
        public dateTime: string,
        public airportName: string,
        public amount: number,
        public productCode: string,
        public productTitle: string,
        public type: string,
        public personName: string,
        public customerName: string,
        public currencyTitle: string,
        public costAmount: number,
        public userName: string,
    ) {
    }
}

export class AircraftRefuelingRecordRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
        public customerId?: number,
        public personId?: number,
        public receiptNo?: any,
    ) {
    }
}
