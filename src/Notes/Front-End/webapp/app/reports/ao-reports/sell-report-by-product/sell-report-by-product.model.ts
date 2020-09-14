import {State} from '@progress/kendo-data-query/dist/npm/state';

export class SellReportByProduct {
    constructor(
        public product: string,
        public sellType: string,
        public fuelType: string,
        public sumSell: number,
        public countFuelReceipt: number,
        public maxSell: number,

    ) {
    }
}

export class SellReportByProductRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
    ) {
    }
}
