import { BaseEntity } from './../../shared';

export class VoucherType implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public voucherTypeGroupId?: number,
        public voucherTypeGroupTitle?: string,
    ) {
    }
}
