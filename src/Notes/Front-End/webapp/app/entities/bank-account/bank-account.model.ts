import { BaseEntity } from './../../shared';

export class BankAccount implements BaseEntity {
    constructor(
    public id?: number,
    public personId?: number,
    public accountNumber?: string,
    public shabaNumber?: string,
    public cardNumber?: string,
    public bankId?: number,
    public bankName?: string,
) {
    }
}
