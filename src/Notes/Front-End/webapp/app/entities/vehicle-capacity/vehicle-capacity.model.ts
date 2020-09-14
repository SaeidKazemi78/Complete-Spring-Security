import { BaseEntity } from './../../shared';

export class VehicleCapacity implements BaseEntity {
    constructor(
    public id?: number,
    public capacity?: number,
    public vehicleModelId?: number,
    public productId?: number,
    public productTitle?: string,
) {
    }
}
