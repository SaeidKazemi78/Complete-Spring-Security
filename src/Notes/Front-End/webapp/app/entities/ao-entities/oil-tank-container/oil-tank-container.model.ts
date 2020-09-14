import {BaseEntity} from '../../../shared/index';

export class OilTankContainer implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public productTitle?: string,
        public productUnitId?: number,
        public productUnitTitle?: string,
        public amount?: number,
        public refuelCenterId?: number,
    ) {
    }
}
