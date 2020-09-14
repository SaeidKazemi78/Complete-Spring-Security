import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class DailySalesSummary {
    constructor(
        public startOrderNo: string,
        public endOrderNo: string,
        public count: number,
        public customerName: string,
        public personName: string,
        public locationTitle: string,
        public amount: number,
        public productTitle: string,
        public ratePrice: number,
        public totalPrice: number,
        public basePrice: number,
        public buyGroup: string,
        public recipNo: string,
        public creditNo: string,
        public costPrice: number,

    ) {
    }
}

export class DailySalesSummaryRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public date?: any,
        public reportType?: any,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public buyGroups?: number[],
        public statuses?: OrderStatus[]
    ) {
        this.timeByOrderCreate = true;
    }
}
