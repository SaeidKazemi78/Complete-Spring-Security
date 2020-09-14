import { BaseEntity } from './../../shared';

export class NiopdcBankAccountType implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
    public code?: string,
) {
    }
}
