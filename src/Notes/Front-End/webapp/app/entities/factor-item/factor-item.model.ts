import { BaseEntity } from './../../shared';

export class FactorItem implements BaseEntity {
    constructor(
        public id?: number,
        public orderId?: number,
        public orderNo?: string,
        public orderProductId?: number,
        public description?: string,
        public amount?: number,
        public productUnit?: string,
        public productRatePrice?: number,
        public basePrice?: number,
        public costPrice?: number,
        public totalPrice?: number,
        public factorId?: number,
    ) {
    }
}
