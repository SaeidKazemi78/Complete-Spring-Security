import { BaseEntity } from './../../shared';

export class PassCard implements BaseEntity {
    constructor(
    public id?: number,
    public fromDate?: any,
    public toDate?: any,
    public serial?: string,
    public driverId?: number,
) {
    }
}
