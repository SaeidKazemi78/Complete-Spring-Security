import {BaseEntity} from './../../shared';

export enum RateDifferenceType {
    'RATE_DIFFERENCE',
    'TANK_CAPACITY'
}

export class RateDifference implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public soldRate?: number,
        public boughtRate?: number,
        public price?: number,
        public rateDifference?: number,
        public productTitle?: string,
        public productId?: number,
        public soldProductRateId?: number,
        public boughtProductRateId?: number,
        public customerName?: string,
        public customerId?: number,
        public rateGroupId?: number,
        public rateDifferenceType?: any,
        public rateDifferenceStatus?: any,
        public fromDate?: any,
        public toDate?: any
    ) {
    }
}

export class RateDifferenceRequest implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public soldRate?: number,
        public boughtRate?: number,
        public productTitle?: string,
        public productId?: number,
        public customerName?: string,
        public customerId?: string,
        public fromDate?: any,
        public rateGroupId?: number,
        public toDate?: any
    ) {
    }
}
