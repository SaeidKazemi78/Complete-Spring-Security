import { BaseEntity } from './../../shared';

export class ProductRateDifferencePayment implements BaseEntity {
    constructor(
        public id?: number,
        public paymentId?: number,
        public price?: number,
        public data?: any,
        public productRateDifferenceId?: number,
    ) {
    }
}
