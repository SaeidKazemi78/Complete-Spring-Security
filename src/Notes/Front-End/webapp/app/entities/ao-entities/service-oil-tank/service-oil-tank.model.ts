import {BaseEntity} from '../../../shared/index';

export enum OilTankStatus {
    'UNDER_REPAIR',
    'STAGNANT',
    'ACTIVE'
}

export class ServiceOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public virtualCapacity?: number,
        public capacity?: number,
        public oilTankStatus?: any,
        public measureType?: any,
        public oilTankId?: number,
    ) {
    }
}
