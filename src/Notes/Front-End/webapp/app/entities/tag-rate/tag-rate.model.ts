import { BaseEntity } from './../../shared';

export class TagRate implements BaseEntity {
    constructor(
    public id?: number,
    public sellPrice?: number,
    public startDate?: any,
    public finishDate?: any,
    public locationId?: number,
) {
    }
}
