import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class TwentyFourAo {
    constructor(
        public hour: string,
        public countFuelReceipt: number,
        public day: string,
    ) {
    }
}
export class TwentyFourAoRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
