import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class DailySalesStatistical {
    constructor(
        public date: any,
        public locationTitle: string,
        public productSrc: string,
        public productTitle: string,
        public customerName: string,
        public ratePrice: number,
        public amount: number,
        public count: number,
        public totalPrice: number,
        public basePrice: number,
        public buyGroup: string,
        public costLadder: number,
        public costPrice: number,
        public costCash: number
    ) {
    }
}

export class DailySalesStatisticalRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public buyGroups?: number[],
        public customers?: number[],
        public statuses?: OrderStatus[],
        public reportType?: any
    ) {
        this.timeByOrderCreate = true;
    }
}
