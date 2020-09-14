
import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class Decomposition {
    constructor(
        public orderNoFrom: string,
        public orderNoTo: string,
        public count: number,
        public customerName: string,
        public locationTitle: string,
        public amount: number,
        public productTitle: string,
        public ratePrice: number,
        public totalPrice: number,
        public basePrice: number,
        public buyGroup: string,
        public issueType: string
    ) {
    }
}

export class DecompositionRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public statuses?: OrderStatus[]
    ) {
        this.timeByOrderCreate = true;
    }
}
