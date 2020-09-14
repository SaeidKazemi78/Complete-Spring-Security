import {BaseEntity} from './../../shared';

export enum SixtyBaseInformationType {
    'OPERATION',
    'DEPOT'
}

export class SixtyBaseInformation implements BaseEntity {
    constructor(
        public id?: number,
        public environmentTemperature?: number,
        public productTemperature?: number,
        public specialWeight?: number,
        public productId?: number,
        public productTitle?: number,
        public registerDate?: any,
        public type?: any,
        public refuelCenterId?: number,
    ) {
    }
}
