import {State} from '@progress/kendo-data-query/dist/npm/state';

export class BoundarySellShiftReport {
    constructor(
        public title: string,
        public count: number,
        public amount: number,
        public price: number,
        public productRatePrice: number,
    ) {
    }
}

export class BoundarySellShiftRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public locationId?: number,
        public productId?: number
    ) {
    }
}
