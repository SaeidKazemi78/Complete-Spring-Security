import { BaseEntity } from './../../shared';

export class CeilingQuota implements BaseEntity {
    constructor(
    public id?: number,
    public startDate?: any,
    public finishDate?: any,
    public amount?: number,
    public customerCreditId?: number,
    public customerId?: number,
) {
    }
}
