import { BaseEntity } from './../../shared';

export class VoucherPayment implements BaseEntity {
    constructor(
    public id?: number,
    public voucherTypeTitle?: string,
    public voucherTypeGroupTitle?: string,
    public locationId?: number,
    public locationTitle?: string,
    public customerIds?: number[],
    public voucherTypeId?: number,
) {
    }
}
