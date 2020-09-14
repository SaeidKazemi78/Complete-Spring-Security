import { BaseEntity } from './../../shared';

export class VoucherTypeGroup implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
    ) {
    }
}
