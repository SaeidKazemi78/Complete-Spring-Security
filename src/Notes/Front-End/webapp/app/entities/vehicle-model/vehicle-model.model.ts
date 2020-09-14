import {BaseEntity} from './../../shared';

export enum CustomerGroup {
    'STATION',
    'SELLER',
    'MAJOR_CONSUMER',
    'AIRPLANE',
    'EXPORT',
    'LIQUID_GAS',
    'BOUNDARY'
}

export enum VehicleModelType {
    'TRUCK',
    'BUS',
    'CAR',
    'AIRPLANE'
}

export class VehicleModel implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public capacityInfo?: string,
        public customerGroup?: any,
        public vehicleModelType?: any,
        public customerType?: BaseEntity,
        public vehicleCapacities?: BaseEntity[],
        public productTitle?: string,
        public productId?: number,
        public confirm?: boolean,
        public capacity?: number
    ) {
    }
}
