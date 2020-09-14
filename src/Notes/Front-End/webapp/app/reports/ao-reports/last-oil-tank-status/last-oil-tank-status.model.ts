import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class LastOilTankStatus {
    constructor(
        public oilTankTitle: string,
        public oiLTankStatus: string,
        public lastDate: any
    ) {
    }
}

export class LastOilTankStatusRequest {
    constructor(
        public state?: State,
        public refuelCenterId?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}
