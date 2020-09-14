import {BaseEntity} from './../../shared';

export class ProductRate implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public containerId?: number,
        public src?: string,
        public productTitle?: string,
        public containerTitle?: string,
        public price?: number,
        public startDate?: any,
        public finishDate?: any,
        public currencyId?: number,
        public rateGroupId?: number,
        public rateGroupTitle?: string,
        public confirm?: boolean,
        public productStepId?: number,
        public productStepNo?: number,
        public adjustment?: boolean,
        public adjustmentNumber?: number,
        public description?: string,
        public orderIds?: number[],
    ) {
    }
}
