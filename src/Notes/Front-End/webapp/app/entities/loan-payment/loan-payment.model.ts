import { BaseEntity } from './../../shared';

export class LoanPayment implements BaseEntity {
    constructor(
    public id?: number,
    public paymentId?: number,
    public price?: number,
    public data?: any,
    public loanId?: number,
    public billItemId?: number,
) {
    }
}
