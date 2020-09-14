import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class AmountReport {
    constructor(
        public personName: string,
        public price: number,
        public amount: number,
        public countFuelReceipt: number,
        public currency: string,
        public currencyRateGroup: string,
        public rateGroup: string,
        public product: string,
        public refuelCenter: string,

    ) {
    }
}

export class AmountReportRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
