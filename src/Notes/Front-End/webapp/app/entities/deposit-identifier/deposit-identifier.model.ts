import {BaseEntity} from './../../shared';
import {Bank} from '../bank';

export class DepositIdentifier implements BaseEntity {
    constructor(
        public id?: number,
        public locationId?: number,
        public priority?: number,
        public personId?: string,
        public customerId?: any,
        public code?: any,
        public bank?: Bank,
        public title?: string
    ) {
    }
}
