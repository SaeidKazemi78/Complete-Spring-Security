import {BaseEntity} from './../../shared';
import {CustomerType} from '../customer-type';
import {Product} from '../product';
import {VehicleModelType} from '../vehicle-model';

export enum RateType {
    'PERCENT',
    'PER_LITRE',
    'PER_LITRE_SCORE'
}

export enum Effect {
    'BASE',
    'TOTAL',
    'PARENT_COST'
}

export enum CostAction {
    'REDUCER',
    'MULTIPLIER',
    'EFFECTLESS'
}

export enum CostType {
    'WITH_ORDER',
    'SEPARATE_RECEIPT',
    'BILL'
}

export enum CostRelated {
    'TAX',
    'COMPLICATION',
    'RENOVATION',
    'POLLUTION',
    'OVERHEAD',
    'OTHER'
}

export class Cost implements BaseEntity {
    constructor(public id?: number,
                public rateType?: any,
                public effect?: any,
                public code?: string,
                public costAction?: any,
                public costType?: CostType,
                public startLitre?: number,
                public endLitre?: number,
                public costRelated?: any,
                public costGroupId?: number,
                public parentId?: number,
                public productIds?: number[],
                public locationIds?: number[],
                public niopdcBankAccountTypeId?: number,
                public customerTypeIds?: number[],
                public canSetProductIds?: boolean,
                public selectiveContractTypes?: boolean,
                public contractTypes?: any[],
                public customerTypes?: CustomerType[],
                public products?: Product[],
                public canSetCustomerTypeIds?: boolean,
                public vehicleModelTypes?: VehicleModelType[],
                public authorityNames?: any[],
                public canSetLocationIds?: boolean,
                public canSetVehicleModelTypes?: boolean,

                ) {
    }
}
