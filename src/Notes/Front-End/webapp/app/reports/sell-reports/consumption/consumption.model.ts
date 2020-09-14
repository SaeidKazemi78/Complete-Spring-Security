
import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class Consumption {
    constructor(

        public productTitle: string,
        public productCode: number
    ) {
    }
}

export class ConsumptionRequest {
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
