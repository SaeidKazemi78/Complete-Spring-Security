import { BaseEntity } from './../../shared';
import {CustomerGroup} from 'app/entities/customer-type';

export enum BuyGroup {
    'CASH',
    'QUOTA',
    'CREDIT',
    'PREBUY',
    'FINANCIAL_LICENSE'
}

export enum BuyTypeUsage {
    'COST',
    'PRODUCT',
    'BOTH'
}

export enum TypeEffect {
    'CREDIT',
    'AMOUNT',
    'BOTH'
}

export class BuyType implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public buyGroup?: BuyGroup|any,
        public effectDate?: number,
        public buyTypeUsage?: BuyTypeUsage|any,
        public typeEffect?: any | TypeEffect,
        public sellLimit?: boolean,
        public minCredit?: number,
        public minAmount?: number,
        public sellContractProducts?: BaseEntity[],
        public customerGroups?: CustomerGroup[]
    ) {
        this.sellLimit = false;
    }
}
