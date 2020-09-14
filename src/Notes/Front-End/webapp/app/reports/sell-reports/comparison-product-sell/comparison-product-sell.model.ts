import {State} from '@progress/kendo-data-query/dist/npm/state';
import {OrderStatus} from 'app/entities/order';

export class Comparison {
    constructor(
        public lastYearPercent?: number,
        public previousMonthPercent?: number,
        public currentMonth?: number,
        public lastYearMonth?: number,
        public previousMonth?: number,
        public productCode?: string,
        public customerName?: string,
        public productTitle?: string,
    ) {
    }
}

export class ComparisonRequest {
    constructor(
        public month?: number,
        public year?: number,
        public state?: State,
        public locations?: number[],
        public regions?: number[],
        public products?: number[],
        public customerTypes?: number[],
        public consumptions?: number[],
    ) {

    }
}
