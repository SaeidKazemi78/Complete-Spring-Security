import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class DetailsBuyRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public reportType?: any,

        public locations?: number[],
        public customerTypes?: number[],
        public regions?: number[],
        public statuses?: OrderStatus[]
    ) {
        this.timeByOrderCreate = true;
    }
}
