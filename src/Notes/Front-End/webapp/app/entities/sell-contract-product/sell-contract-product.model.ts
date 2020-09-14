import {BaseEntity} from '../../shared';
import {CostResponse} from '../order';
import {DayDepot} from '../ao-entities/day-depot';
import {BuyType} from 'app/entities/buy-type';
import {Container} from 'app/entities/container';

export enum TypeOfFuelReceipt {
    'TANKER_SALES',
    'PIPE_LINE_SALES',
    'UNIT_TO_AIRPLANE',
    'UNIT_TO_CUSTOMERS'
}

export class SellContractProduct implements BaseEntity {
    constructor(
        public id?: number,
        public exportPiId?: number,
        public rateGroupId?: number,
        public rateGroupTitle?: string,
        public currencyRateGroupId?: number,
        public currencyRateGroupTitle?: string,
        public consumptionId?: number,
        public productTitle?: string,
        public productColer?: string,
        public hasContainer?: boolean,
        public calculateContainerPrice?: boolean,
        public containerId?: number,
        public containerCapacity?: number,
        public productId?: number,
        public productColor?: string,
        public manualQuota?: boolean,
        public sellContractCustomerId?: number,
        public sellContractCustomerIds?: number[],
        public depots?: BaseEntity[],
        public buyTypes?: BuyType[],
        public costGroupIds?: number[],
        public currencyIds?: number[],
        public sellContractId?: number,
        public sellContractNumber?: string,
        public costResponses?: CostResponse[],
        public startDate?: any,
        public finishDate?: any,
        public typeOfFuelReceipts?: any[],
        public capacity?: number,
        public dayDepots?: DayDepot[],
        public productRatePrice?: number,
        public productRateCurrencyId?: number,
        public productRateSrc?: number,
        public adjustment?: boolean,
        public niopdcBankAccountTypeId?: number,
        public niopdcBankAccountTypeTitle?: string,
        public productRateId?: number

) {
    }
}
