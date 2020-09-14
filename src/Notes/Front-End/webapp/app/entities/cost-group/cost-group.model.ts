import {BaseEntity} from './../../shared';
import {CustomerType} from '../customer-type';
import {Product} from '../product';
import {VehicleModelType} from '../vehicle-model';
import {Cost} from '../cost';

export enum CostGroupType {
    'CASH',
    'LADDER',
    'ENCOURAGEMENT',
    'SUPPLEMENT',
    'ALPHA',
    'WAGE'
}

export enum CostMethod {
    'NORMAL_SALES',
    'DEFUEL',
    'PUMP_NOZZLE',
    'ALONG_FUEL'

}

export enum Forced {
    'FORCE',
    'OPTIONAL'
}

export enum CostGroupAccessType {
    TRADE, FINANSIAL
}

export enum PaymentPeriod {
    'DAY',
    'MONTH',
    'SEASON',
    'YEAR'
}

export enum CostType {
    'WITH_ORDER',
    'BILL'
}

export enum CostCategory {
    'EVAPORATION',
    'COST',
    'WAGE'
}

export enum CostMaterialType {
    'CONTAINER',
    'PRODUCT'
}

export class CostGroup implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public costMaterialType?: string,
                public subTitle?: string,
                public code?: string,
                public locationTitles?: string,
                public costGroupType?: any,
                public costMethod?: any,
                public costGroupAccessTypes?: any[],
                public contractTypes?: any[],
                public selectiveContractTypes?: boolean,
                public productIds?: number[],
                public locationIds?: number[],
                public boundaryLocationIds?: number[],
                public paymentPeriod?: any,
                public customerTypeIds?: number[],
                public bankAccountTypeId?: number,
                public customerTypes?: CustomerType[],
                public products?: Product[],
                public canSetCustomerTypeIds?: boolean,
                public canSetProductIds?: boolean,
                public forced?: any,
                public costType?: any,
                public authorityNames?: any[],
                public customerGroup?: any,
                public vehicleModelTypes?: VehicleModelType[],
                public singleCost?: boolean,
                public productRateEffect?: boolean,
                public cost?: Cost,
                public canSetLocationIds?: boolean,
                public canSetVehicleModelTypes?: boolean,
                public step?: boolean,
                public costCategory?: string,
                public description?: string,
    ) {
        this.customerGroup = null;
    }
}
