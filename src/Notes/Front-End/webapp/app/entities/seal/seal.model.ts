import { BaseEntity } from './../../shared';

export class Seal implements BaseEntity {
    constructor(
    public id?: number,
    public boxNo?: string,
    public prefix?: string,
    public startSealNumber?: number,
    public endSealNumber?: number,
    public currentSealNumber?: number,
    public refuelCenterId?: number,
) {
    }
}
