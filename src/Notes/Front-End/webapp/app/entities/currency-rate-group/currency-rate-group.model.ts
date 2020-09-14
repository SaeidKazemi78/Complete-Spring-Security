import { BaseEntity } from '../../shared';

export class CurrencyRateGroup implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
) {
    }
}
