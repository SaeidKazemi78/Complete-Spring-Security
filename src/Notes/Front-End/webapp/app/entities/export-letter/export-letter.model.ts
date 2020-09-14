import {BaseEntity} from './../../shared';

export enum ExportLetterType {
    'EXCHANGE',
    'NORMAL'
}

export enum ExportLetterStatus {
    'PENDING',
    'ACTIVE',
    'REVOCATION'
}

export enum DeliveryTerm {
    'EX_WORKS',
    'FOB'
}

export class ExportLetter implements BaseEntity {
    constructor(
        public id?: number,
        public type?: ExportLetterType | any,
        public status?: ExportLetterStatus | any,
        public deliveryTerm?: DeliveryTerm,
        public declarationNumber?: string,
        public registerDate?: any,
        public dueDate?: any,
        public expiryDate?: any,
        public payDate?: any,
        public deliveryLocation?: string,
        public amount?: number,
        public baseRate?: number,
        public price?: number,
        public currencyId?: number,
        public sanaRate?: number,
        public exclusiveConditions?: string,
        public generalConditions?: string,
        public longTerm?: boolean,
        public agentBrokerId?: number,
        public buyerAgentBrokerId?: number,
        public buyerId?: number,
        public buyerName?: number,
        public destinationId?: number,
        public productId?: number,
        public productTitle?: number,
        public exportPis?: BaseEntity[],
        public sellContractId?: number,
        public paymentPeriod?: number,
        public nationalCurrency?: boolean

    ) {
        this.longTerm = false;
    }
}
