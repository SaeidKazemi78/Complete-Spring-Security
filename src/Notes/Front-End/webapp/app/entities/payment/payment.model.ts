import {BaseEntity} from './../../shared';

export enum ReceiptMethod {
    'BRANCH',
    'EPAYMENT',
    'POS'
}

export enum Bank {
    'MARKAZI',
    'MELLAT'
}

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public currencyId?: number,
        public bankAccountNumber?: string,
        public name?: string,
        public receiptNo?: string,
        public depositIdentifier?: string,
        public requestIdentifier?: string,
        public receiptDateTime?: any,
        public receiptBody?: string,
        public amount?: number,
        public currentAmount?: number,
        public registerMethod?: ReceiptMethod | any,
        public verified?: boolean,
        public bank?: Bank,
    ) {
    }
}

export class PaymentInquiry implements BaseEntity {
    constructor(
        public id?: number,
        public location?: string,
        public plaque?: string,
        public rfId?: string,
        public customer?: string,
        public person?: string,
        public boundaryCustomer?: boolean,
        public niopdcBankAccount?:  any,
        public branch?: number,
        public amount?: number,
        public receiptDateTime?: any,
        public referenceId?: string,
        public type?: any,
        public bank?: any,
        public customPlaque?: any,
        public customPlaqueTwo?: any,
    ) {
    }
}
