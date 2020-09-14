import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Platform {
    constructor(
        public unitName: string,
        public platformName: string,
        public productCode: string,
        public productName: string,
        public amount: number,
        public refuelCenter: string,
        public dayDate: string,
        public count: string,

    ) {
    }
}

export class PlatformRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
        public oilTankId?: number
    ) {
    }
}
