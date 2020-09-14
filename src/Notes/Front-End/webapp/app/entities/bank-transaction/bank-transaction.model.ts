import { BaseEntity } from './../../shared';

export enum BankTransactionState {
    'BEGIN',
    'SYS_ERROR',
    'CANCEL',
    'BANK_ERROR',
    'COMPLETE',
    'COMPLETE_PAY',
    'FAILED',
    'INVALIDATE',
    'PENDING'
}

export enum PaymentMethod {
    'WALLET',
    'CASH'
}

export class BankTransaction implements BaseEntity {
    constructor(
        public id?: number,
        public identifier?: string,
        public username?: string,
        public requestDate?: any,
        public bankTransactionState?: BankTransactionState,
        public type?: any,
        public amount?: number,
        public responseBody?: string,
        public responseDate?: any,
        public error?: string,
        public redirectUrl?: string,
        public providerIdentifier?: string,
        public bankRedirectUrl?: string,
        public depositIdentifier?: string,
        public ipgs?: any[],
        public userPosDevices?: any[],
        public bankTransactionRefs?: any[],
        public locationId?: number,
        public niopdcBankAccountTypeId?: number,
        public paymentMethod?: any

    ) {
    }
}

export class BankTransactionRef implements BaseEntity {
    constructor(
        public id?: number,
        public orderId?: number,
        public personId?: number,
        public customerId?: number,
        public amount?: number,
        public bankTransactionId?: number,
        public niopdcBankAccountTypeId?: number,
    ) {
    }
}
