import {BaseEntity} from '../../shared';
import {VehicleModelType} from '../vehicle-model';

export enum LocationType {
    'FIXED',
    'MOVABLE'
}

export enum CustomerGroup {
    'STATION',
    'SELLER',
    'MAJOR_CONSUMER',
    'AIRPLANE',
    'EXPORT',
    'LIQUID_GAS',
    'BOUNDARY'
}

export class CustomerType implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public locationType?: any,
        public customerGroup?: any | CustomerGroup,
        public taxExempt?: boolean,
        public hasGsId?: boolean,
        public active?: boolean,
        public manualQuota?: boolean,
        public iranian?: boolean,
        public customerCodeTitle?: string,
        public customerTypeIgnores?: BaseEntity[],
        public customerDeactiveRules?: BaseEntity[],
        public vehicleModelType?: VehicleModelType | any,

    ) {
        this.taxExempt = false;
        this.hasGsId = false;
    }
}
