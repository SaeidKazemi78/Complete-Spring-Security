import { BaseEntity } from './../../shared';

export class CarBak implements BaseEntity {
    constructor(
    public id?: number,
    public capacity?: number,
    public carId?: number,
    public productId?: number,
) {
    }
}
