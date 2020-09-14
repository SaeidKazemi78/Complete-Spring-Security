import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Unit {
    constructor(
        public unitName: string,
        public productCode: string,
        public productName: string,
        public amount: number,
        public refuelCenter: string,

    ) {
    }
}

export class UnitRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
