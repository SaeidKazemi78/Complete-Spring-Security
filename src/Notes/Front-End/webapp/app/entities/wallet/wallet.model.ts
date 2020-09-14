import {BaseEntity} from './../../shared';

export class Wallet implements BaseEntity {
    constructor(
        public id?: number,
        public personId?: number,
        public customerId?: number,
        public amount?: number,
        public  bankAccountTypeId?: number,
        public  bankAccountTypeTitle?: string,
        public  bankAccountTypeCode?: number
    ) {
    }
}
