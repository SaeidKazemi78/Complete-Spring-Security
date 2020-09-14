import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class BrandSell {
    constructor(
        public customerName?: any,
        public productTitle?: any,
        public amount?: any,
        public productRatePrice?: any,
        public productPrice?: any,
        public costPrice?: any,
        public totalPrice?: any,
    ) {
    }
}

export class BrandSellRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public reportType?: any,
        public sellContractPersonId?: number,
        public locations?: number[],
        public customerTypes?: number[],
        public regions?: number[],
        public statuses?: OrderStatus[]
    ) {
        this.timeByOrderCreate = true;
    }
}
