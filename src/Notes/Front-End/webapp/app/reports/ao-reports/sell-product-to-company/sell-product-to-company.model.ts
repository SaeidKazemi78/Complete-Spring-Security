import {State} from '@progress/kendo-data-query/dist/npm/state';

export class SellProductToCompanyRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
    ) {
    }
}
