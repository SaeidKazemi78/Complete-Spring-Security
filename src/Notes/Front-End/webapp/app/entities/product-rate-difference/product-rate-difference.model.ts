import {BaseEntity} from './../../shared';

export enum ProductRateDifferenceStatus {
    'DRAFT',
    'PAID'
}

export enum ProductRateDifferenceType {
    'EXIT_FROM_DEPOT',
    'SELL',
    'SELL_AND_PRD'
}

export class ProductRateDifference implements BaseEntity {
    constructor(
        public id?: number,
        public orderId?: number,
        public orderNo?: string,
        public orderRegisterDate?: any,
        public exitFromDepotDate?: any,
        public orderProductId?: number,
        public amount?: number,
        public maxAmount?: number,
        public fromRateGroupId?: number,
        public toRateGroupId?: number,
        public fromProductRateId?: number,
        public fromProductRatePrice?: number,
        public toProductRateId?: number,
        public toProductRatePrice?: number,
        public fromCurrencyId?: number,
        public toCurrencyId?: number,
        public fromCurrencyRate?: number,
        public toCurrencyRate?: number,
        public price?: number,
        public status?: ProductRateDifferenceStatus|any,
        public type?: ProductRateDifferenceType|any,
        public productTitle?: string,
        public canInsert?: boolean,
        public date?: any
    ) {
        this.date = new Date();
    }
}

export class ProductRateDifferenceRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public type?: ProductRateDifferenceType|any,
        public productId?: number,
        public fromRateGroupId?: number,
        public date?: any,
        public toRateGroupId?: number,
        public productRateDifferences?: ProductRateDifference[],
    ) {
    }
}
