import {BaseEntity} from './../../shared';

export enum PaymentPeriod {
    'DAY',
    'MONTH',
    'SEASON',
    'YEAR'
}

export class Bill implements BaseEntity {
    constructor(
        public id?: number,
        public customerId?: number,
        public name?: string,
        public sellContractId?: number,
        public locationId?: number,
        public startDate?: any,
        public finishDate?: any,
        public paymentPeriod?: any,
        public year?: number,
        public season?: number,
        public month?: number,
        public day?: number,
        public price?: number,
        public billItems?: BaseEntity[],
    ) {
    }
}

export class BillReport {
    constructor(
        public title?: string,
        public date?: any,
        public amount?: number,
        public rate?: number,
        public credit?: number,
        public debit?: number
    ) {
    }
}
