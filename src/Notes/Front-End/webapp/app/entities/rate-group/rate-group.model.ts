import {BaseEntity} from './../../shared';
import {CustomerGroup} from '../cost-element';
import {VehicleModelType} from '../vehicle-model';
import {PaymentPeriod} from '../cost-group';

export enum RateGroupType {
    'SUBSIDY',
    'NON_SUBSIDY',
    'DIFFERENCE_TRANSIT',
    'BOUNDARY_TRANSIT',
    'DIFFERENCE_TRANSHIP',
    'BOUNDARY_TRANSHIP',
    'FOB'
}

export class RateGroup implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public locationTitles?: string,
        public type?: string | RateGroupType,
        public foreignExchange?: boolean,
        public locationIds?: any[],
        public customerTypeIds?: number[],
        public contractTypes?: string[],
        public selectiveCustomerTypes?: boolean,
        public customerGroup?: string | CustomerGroup,
        public selectiveContractTypes?: boolean,
        public canSetProductIds?: boolean,
        public regionIds?: number[],
        public productIds?: number[],
        public productRates?: any[],
        public bankAccountTypeId?: number,
        public archive?: boolean,
        public vehicleModelType?: VehicleModelType,
        public rateTitle?: string,
        public step?: boolean,
        public paymentPeriod?: string | PaymentPeriod,
        public description?: string,
        public rateDifference?: boolean,
    ) {
        this.customerGroup = null;
    }
}

export class RateGroupObject {
    constructor(
        public title?: string,
        public locationTitle?: string,
        public type?: string | RateGroupType,
        public archive?: boolean,
        public page?: any,
        public size?: any,
        public sort?: string[],
    ) {
    }
}
