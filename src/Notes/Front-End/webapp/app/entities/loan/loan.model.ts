import { BaseEntity } from './../../shared';


export class Loan implements BaseEntity {
    constructor(
    public id?: number,
    public customerId?: number,
    public customerName?: string,
    public amount?: number,
    public description?: string,
    public installmentCount?: number,
    public firstPaymentDate?: any,
    public completed?: boolean,
    public payByBill?: boolean,
    public penaltyDay?: number,
    public loanTypeId?: number,
    public loanTypeTitle?: string,
    public loanTypeInterest?: number,
    public month?: number,
    public year?: number,
    public havePayment?: boolean,
    public customerLocationId?: number,
    public niopdcBankAccountTypeId?: number,
) {
        this.completed = false;
        this.payByBill = false;
    }
}
