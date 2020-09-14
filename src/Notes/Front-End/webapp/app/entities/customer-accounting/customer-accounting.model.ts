import {BaseEntity} from './../../shared';

export class CustomerAccounting implements BaseEntity {
    constructor(
        public id?: number,
        public contractType?: any,
        public personId?: number,
        public customerId?: number,
        public bankAccountId?: number,
        public creditAccountPerson?: string,
        public creditAccountCustomer?: string,

    ) {
    }
}
