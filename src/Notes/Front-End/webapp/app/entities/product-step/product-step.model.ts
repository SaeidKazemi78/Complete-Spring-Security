import { BaseEntity } from './../../shared';

export class ProductStep implements BaseEntity {
    constructor(
    public id?: number,
    public productId?: number,
    public stepNo?: number,
    public startStep?: any,
    public finishStep?: any,
    public productTitle?: string,
    public paymentPeriod?: string
) {
    }
}
