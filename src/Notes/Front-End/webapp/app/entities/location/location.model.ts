import {BaseEntity} from '../../shared';
import {Country} from '../country';

export enum TranshipType {
    'INSIDE_TO_OUT',
    'OUT_TO_INSIDE_WHIT_PRIMITIVE',
    'OUT_TO_INSIDE_WHIT_OUT_PRIMITIVE',
    'ONLY_PUMP_NOZZLE',
    'INSIDE_TO_INSIDE'
}

export class OrderNumber {
    constructor(
        public id?: number,
        public startOrderNumber?: number,
        public endOrderNumber?: number,
        public currentOrderNumber?: number) {
    }
}

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public rmtoCode?: string,
        public financialCode?: string,
        public costAccount?: string,
        public startOrderNumber?: string,
        public endOrderNumber?: string,
        public currentOrderNumber?: string,
        public depotPath?: string,
        public hasDepot?: boolean,
        public docForParentLocation?: boolean,
        public checkbookAccountNumber?: string,
        public haveBoundarySell?: boolean,
        public level?: number,
        public locationId?: number,
        public parentLocationId?: number,
        public depots?: BaseEntity[],
        public regions?: BaseEntity[],
        public sellContractCustomers?: BaseEntity[],
        public people?: BaseEntity[],
        public customers?: BaseEntity[],
        public news?: BaseEntity[],
        public sellContracts?: BaseEntity[],
        public transhipType?: string,
        public beforeControl?: boolean,
        public beforeControlTranship?: boolean,
        public customerDeactiveRules?: BaseEntity[],
        public country?: Country,
        public countryId?: number,
        public canOpen?: Boolean,
        public canClose?: Boolean,
        public subLocations?: Location[],
        public tolerance?: number,
        public draftHour?: number,
        public boundaryExemption?: number,
        public bankAccountTypeIds?: number[],
        public stateCode?: string,
        public farCountry?: boolean,
        public pumpBeforeControl?: boolean
    ) {
    }
}

export class LocationDate {
    constructor(
        public serverDate?: any,
        public locationDay?: any,
        public day?: boolean,
    ) {
    }
}
