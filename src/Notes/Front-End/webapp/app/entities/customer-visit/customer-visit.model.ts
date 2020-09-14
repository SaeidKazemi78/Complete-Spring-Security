import { BaseEntity } from './../../shared';

export class CustomerVisit implements BaseEntity {
    constructor(
    public id?: number,
    public description?: string,
    public createdDate?: any,
    public customerId?: number,
) {
    }
}
