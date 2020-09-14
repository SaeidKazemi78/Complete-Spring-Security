import { BaseEntity } from './../../shared';

export class LoanType implements BaseEntity {
    constructor(
    public id?: number,
    public penalty?: number,
    public title?: string,
    public description?: string,
    public maxAmount?: number,
    public startDate?: any,
    public finishDate?: any,
    public loanEffectType?: any,
    public maxInstallmentCount?: number,
    public interest?: number,
    public calcPenaltyAfterDay?: number,
    public niopdcBankAccountTypeId?: number,
) {
    }
}
