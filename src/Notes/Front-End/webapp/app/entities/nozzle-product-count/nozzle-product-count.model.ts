import { BaseEntity } from './../../shared';

export const enum NozzleProductType {
    'PETROL',
    'SUPER_PETROL',
    'CNG',
    'GAS_OIL'
}

export class NozzleProductCount implements BaseEntity {
    constructor(
        public id?: number,
        public nozzleProductType?: NozzleProductType,
        public nozzleCount?: number,
        public customerStationInfoId?: number,
    ) {
    }
}
