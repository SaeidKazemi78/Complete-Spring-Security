import { BaseEntity } from './../../shared';

export class ExportPiPayment implements BaseEntity {
    constructor(
    public id?: number,
    public paymentId?: number,
    public registerDate?: any,
    public price?: number,
    public percent?: number,
    public quota?: number,
    public sanaRate?: number,
    public sanaRateBuy?: number,
    public sanaRateSell?: number,
    public receiptNo?: string,
    public hashCode?: string,
    public exportPiId?: number,
) {
    }
}
