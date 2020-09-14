import { BaseEntity } from './../../shared';

export class VoucherItem implements BaseEntity {
    constructor(
    public id?: number,
    public rowNo?: number,
    public extra?: string,
    public special?: string,
    public credit?: number,
    public debit?: number,
    public description?: string,
    public accountNo?: string,
    public suffix?: string,
    public key?: string,
    public voucherMasterId?: number,
) {
    }
}
