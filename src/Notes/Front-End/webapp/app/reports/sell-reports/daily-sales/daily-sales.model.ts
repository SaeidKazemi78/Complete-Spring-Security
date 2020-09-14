import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class DailySales {
    constructor(
        public depotTitle: string,
        public productTitle: string,
        public locationTitle: string,
        public ratePrice: string,
        public amount: string,
        public totalPrice: number,
        public basePrice: string,
        public customerName: string,
        public personName: string,
        public buyGroup: string,
        public status: string,
        public costPrice: string,
        public currency: string,
        public  reciptNo: string,
       public   creditNo: string
    ) {
    }
}

export class DailySalesRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public depots?: number[],
        public buyGroups?: number[],
        public customers?: number[],
        public people?: number[],
        public currencies?: number[],
        public statuses?: OrderStatus [],
        public reportType?: any,
    ) {
        this.timeByOrderCreate = true;
    }
}
