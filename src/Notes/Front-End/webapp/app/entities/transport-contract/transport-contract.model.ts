import {BaseEntity} from './../../shared';

export enum TransportContractStatus {
    'CONFIRM',
    'PENDING'
}
export class TransportContract implements BaseEntity {
    constructor(
        public id?: number,
        public contractCode?: string,
        public startDate?: any,
        public finishDate?: any,
        public customerId?: number,
        public personId?: number,
        public personName?: string,
        public confirm?: boolean,
    ) {
    }
}
