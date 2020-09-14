import { BaseEntity } from './../../shared';

export class Supply implements BaseEntity {
    constructor(
    public id?: number,
    public amount?: number,
    public minimumAmount?: number,
    public basePrice?: number,
    public broker?: string,
    public telephone?: string,
    public supplyDate?: any,
    public description?: string,
    public productId?: number,
    public depotId?: number,
    public countryId?: number,
) {
    }
}
