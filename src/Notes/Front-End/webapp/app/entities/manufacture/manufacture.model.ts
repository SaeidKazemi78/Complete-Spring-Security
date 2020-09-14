import { BaseEntity } from '../../shared';

export class Manufacture implements BaseEntity {
    constructor(
    public id?: number,
    public name?: string,
) {
    }
}
