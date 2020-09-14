import { BaseEntity } from './../../shared';

export class CustomerScore implements BaseEntity {
    constructor(
    public id?: number,
    public score?: number,
    public startDate?: any,
    public finishDate?: any,
    public customerId?: number,
) {
    }
}
