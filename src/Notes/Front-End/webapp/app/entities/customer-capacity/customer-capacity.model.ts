import { BaseEntity } from './../../shared';

export class CustomerCapacity implements BaseEntity {
    constructor(
    public id?: number,
    public capacity?: number,
    public customerId?: number,
    public productGroupId?: number,
) {
    }
}
