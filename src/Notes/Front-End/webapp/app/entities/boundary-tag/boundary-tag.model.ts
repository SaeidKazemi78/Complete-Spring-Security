import { BaseEntity } from './../../shared';

export class BoundaryTag implements BaseEntity {
    constructor(
    public id?: number,
    public amount?: number,
    public buyPrice?: number,
    public buyDate?: any,
    public locationId?: number,
) {
    }
}
