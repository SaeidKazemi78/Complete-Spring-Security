import {BaseEntity} from './../../shared';

export enum PosDeviceServiceType {
    'SINGLE_PAY',
    'MULTI_PAY'
}

export class PosDeviceAccount implements BaseEntity {
    constructor(
        public id?: number,
        public tid?: number,
        public niopdcBankAccountId?: number,
        public niopdcBankAccountTypeIds?: number[],
        public payerId?: string,
        public accountIdentifier?: string,
        public active?: boolean
    ) {
        this.active = true;
    }
}

export class PosDevice implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: string,
        public active?: boolean,
        public pcId?: string,
        public locationId?: number,
        public serviceTypes?: any[] | PosDeviceServiceType[],
        public posDeviceAccounts?: PosDeviceAccount[],
    ) {
        this.active = false;

    }
}
