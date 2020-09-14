import {State} from '@progress/kendo-data-query/dist/npm/state';

export class DepotInventory {
    constructor(
        public unitName: string,
        public metreName: string,
        public productCode: string,
        public productName: string,
        public amount: number,
        public refuelCenter: string,
        public dayDate: string,
        public count: string,
        public startMetre: string,
        public endMetre: string,
    ) {
    }
}

export class DepotInventoryRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
        public productId?: number,
        public month?: number,
        public year?: number,
        public oilTankId?: number,
        public reportType?: string
    ) {
    }
}
