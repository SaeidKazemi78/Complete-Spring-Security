import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class TotalSellGround {
    constructor(
        public amount: number,
        public rate: number,
        public totalPrice: number,
        public productTitle: string,
        public productCode: string,
        public sellToDifferent: boolean,

    ) {
    }
}

export class TotalSellGroundRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
