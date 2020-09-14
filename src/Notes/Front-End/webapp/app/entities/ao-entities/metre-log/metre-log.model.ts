import {BaseEntity} from '../../../shared/index';

export enum FuelType {
    'RE_FUEL',
    'DE_FUEL'
}

export class MetreLog implements BaseEntity {
    constructor(
        public id?: number,
        public startMeter?: number,
        public endMeter?: number,
        public machineEndMetre?: number,
        public differenceEndMetre?: number,
        public amount?: number,
        public registerDate?: any,
        public fuelType?: any,
        public transferId?: number,
        public transferPlatformToUnitId?: number,
        public logBookId?: number,
        public metreId?: number,
        public draft?: boolean,
        public useType?: string,
        public productTitle?: string,
        public productGroupTitle?: string,
        public difference?: number,
    ) {
    }
}
