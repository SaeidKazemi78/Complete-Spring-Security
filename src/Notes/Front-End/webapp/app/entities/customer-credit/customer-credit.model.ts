import {BaseEntity} from './../../shared';
import {BuyGroup, BuyTypeUsage, TypeEffect} from '../buy-type';
import {Class} from 'estree';

export class CustomerCredit implements BaseEntity {
    constructor(public id?: number,
                public startDate?: any,
                public finishDate?: any,
                public exportationDate?: any,
                public creditNumber?: number,
                public currentCredit?: number,
                public credit?: number,
                public currentAmount?: number,
                public amount?: number,
                public currencyId?: number,
                public currencyRateGroupId?: number,
                public customerId?: number,
                public customerName?: number,
                public parentBuyTypeId?: number,
                public parentBuyTypeTitle?: string,
                public parentBuyGroup?: string | BuyGroup,
                public parentTypeEffect?: string | TypeEffect,
                public parentBuyType?: string | TypeEffect,
                public parentBuyTypeUsage?: string | BuyTypeUsage,
                public personId?: number,
                public minCredit?: number,
                public minAmount?: number,
                public parentBuyTypeMinCredit?: number,
                public parentBuyTypeMinAmount?: number,
                public hasAllowedDays?: boolean,
                public active?: boolean,
                public customerCreditAllowedDays?: BaseEntity[],
                public sellContractId?: number,
                public sellContractNo?: string,
                public productId?: number,
                public exportPiId?: number) {
    }
}

export class CustomerCreditAllowedDay {
    constructor(
        public id?: number,
        public day?: any,
        public description?: string,
        public customerCreditId?: number
    ) {
    }
}

export class CreditBuyTypeRemained {
    constructor(
        public remainedAmount?: number,
        public remainedCredit?: number,
        public buyGroup?: BuyGroup,
        public productTitle?: string,
        public productCode?: string

    ){

    }
}
