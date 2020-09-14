import { BaseEntity } from './../../shared';

export class CustomerTypeProductConsumption implements BaseEntity {
    constructor(
        public id?: number,
        public customerTypeId?: number,
        public customerTypeTitle?: string,
        public productId?: number,
        public productTitle?: string,
        public consumptionId?: number,
        public consumptionTitle?: string,
    ) {
    }
}
