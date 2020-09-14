import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class TotalPlatform {
    constructor(
        public oilTankTitle: string,
        public product: string,
        public platformSell: number,
        public unitToPlatform: number,
        public totalAmount: number,
    ) {
    }
}

export class TotalPlatformRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
        public oilTankId?: number,
    ) {
    }
}
