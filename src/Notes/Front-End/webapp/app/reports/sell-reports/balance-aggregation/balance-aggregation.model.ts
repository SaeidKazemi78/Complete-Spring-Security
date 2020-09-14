import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';
import {BuyType} from 'app/entities/buy-type';

export class BalanceAggregationReport {
    constructor(
        public  productTitle?: string,
        public  productCode?: string
    ) {
    }
}

export class BalanceAggregationReportRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public reportType?: any,
        public finishDate?: any,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public statuses?: OrderStatus[]
    ) {
        this.timeByOrderCreate = true;
    }
}
