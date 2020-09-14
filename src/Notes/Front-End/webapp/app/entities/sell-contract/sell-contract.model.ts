import {BaseEntity} from './../../shared';

export enum ContractType {
    'SUPPLY_CHANNEL',
    'EXPORT',
    'CONSUMER',
    'LIQUID_GAS',
    'MILITARY',
    'AIRPLANE',
    'BRAND'
}

export class NativeSellContract implements BaseEntity {
    constructor(public id?: number,
                public contractNo?: string,
                public peoples?: string,
                public customers?: string,
                public active?: boolean) {

    }
}

export class SellContract implements BaseEntity {
    constructor(
        public id?: number,
        public customerDeactiveRuleId?: number,
        public startDate?: any,
        public finishDate?: any,
        public createdDate?: any,
        public exportationDate?: any,
        public contractNo?: string,
        public description?: string,
        public contractType?: ContractType | any,
        public active?: boolean,
        public customers?: string,
        public people?: string,
        public sellContractCustomers?: SellContractCustomer[],
        public sellContractPeople?: SellContractPerson[],
        public calculateTax?: boolean,
        public finishDateServer?: any,
        public archive?: any,
        public addendumNumber?: any,
        public customerName?: any,
        public personName?: any,
        public locationId?: number,
        public locationIds?: number[],
    ) {
    }
}

export class SellContractCustomer implements BaseEntity {
    constructor(
        public id?: number,
        public hasTransport?: boolean,
        public sellContractId?: number,
        public customerId?: number,
        public customerName?: string,
        public customerRegCode?: string,
        public locationId?: number,
        public locationName?: number,
        public sellContractProducts?: BaseEntity[],
        public customerGroup?: any,
        public customerTypeId?: number,
        public creditAccount?: string,
        public costAccount?: string
    ) {
        this.hasTransport = false;
    }
}

export class SellContractPerson implements BaseEntity {
    constructor(
        public id?: number,
        public sharePercent?: number,
        public sellContractId?: number,
        public sellContractContractNo?: number,
        public personId?: number,
        public main?: boolean,
        public disableMain?: boolean,
        public personFullName?: string,
        public creditAccount?: string,
        public costAccount?: string
    ) {
    }
}

export class TransferQuota {
    constructor(
        public fromSellContractProductId?: number,
        public toSellContractProductId?: number,
        public sellContractId?: number,
        public amount?: number,
    ) {
    }
}

export class CustomerSellContract {
    constructor(
        public id?: string,
        public customerName?: string,
        public customerCode?: string,
        public sellContractId?: number,
        public locationId?: number,
        public customerId?: number,
        public contractNo?: string,
    ) {
    }
}
