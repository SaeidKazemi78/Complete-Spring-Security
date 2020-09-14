import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class TotalSell {
    constructor(
        public day: any,
        public productCode: string,
        public productName: string,
        public airportName: string,
        public amount: string,
        public count: string,
        public price: string,
        public fuelType: string,

    ) {
    }
}

export class TotalSellRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
