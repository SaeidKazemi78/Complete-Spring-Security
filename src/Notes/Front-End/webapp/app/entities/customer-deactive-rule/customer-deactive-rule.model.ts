import {BaseEntity} from './../../shared';
import {CustomerGroup} from 'app/entities/customer-type';

export enum DeactiveReason {
    'DEBTOR',
    'DOCUMENT_DEFECT',
    'NOT_SETTLEMENTS',
    'OTHERS'

}

export class CustomerDeactiveRule implements BaseEntity {
    constructor(
        public id?: number,
        public customerName?: string,
        public customerId?: number,
        public startDate?: any,
        public finishDate?: any,
        public description?: string,
        public locations?: BaseEntity[],
        public customerTypes?: BaseEntity[],
        public deactiveReasons?: any[],
        public startPeriodDay?: number,
        public endPeriodDay?: number,
        public periodic?: boolean,
        public exceptionCustomers?: number [],
        public byCustomerType?: boolean,
        public customerGroup?: CustomerGroup
    ) {
    }
}
