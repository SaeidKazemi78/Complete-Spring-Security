import { BaseEntity } from '../../shared';

export class CurrencyRate implements BaseEntity {
    constructor(
    public id?: number,
    public rate?: number,
    public activeStartDate?: any,
    public activeFinishDate?: any,
    public currencyId?: number,
    public currencyRateGroupId?: number,
) {
    }
}
