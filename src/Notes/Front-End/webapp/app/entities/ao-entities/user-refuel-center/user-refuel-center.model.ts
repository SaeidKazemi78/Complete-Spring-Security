import {BaseEntity} from '../../../shared/index';

export enum AccessType {
    'ACCESS',
    'READ'
}

export class UserRefuelCenter implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public accessType?: any,
        public refuelCenters?: BaseEntity[],
    ) {
    }
}
