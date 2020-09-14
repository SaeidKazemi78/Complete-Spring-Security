import {BaseEntity} from '../../../shared/index';
import {RequestElement} from '../request-element/index';
import {LastChangeDateElement} from '../last-change-date-element/index';

export enum FilterLocation {
    'DRAIN_TANKER',
    'BETWEEN_MAIN_AND_SERVICE',
    'LADING_UNIT',
    'OIL_DEPOT'
}

export enum ElementRequestReason {
    'MAX_DIFF',
    'MAX_TIME_ELAPSED',
    'UNACCEPTABLE_DROP',
    'UNACCEPTABLE_RESULT',
    'ABNORMAL_RESULT',
    'TEARING_ELEMENT',
    'SUDDEN_DROP'
}

export enum RequestStatus {
    'DRAFT',
    'CONFIRM',
    'SEND'
}

export class RequestFilterElement implements BaseEntity {
    constructor(
        public id?: number,
        public filterLocation?: string,
        public productId?: number,
        public maximumPressureDifference?: number,
        public elementRequestReason?: string,
        public amountOfFuelPassed?: number,
        public requestStatus?: RequestStatus | any,
        public draftUser?: string,
        public confirmUser?: string,
        public sendUser?: string,
        public refuelCenterId?: number,
        public refuelCenterPersianTitle?: string,
        public oilTankId?: number,
        public oilTankTitle?: string,
        public changeFilterElementId?: number,
        public changeFilterElementRequestStatus?: RequestStatus | any,
        public filterId?: number,
        public filterTitle?: string,
        public requestElements?: RequestElement[],
        public lastChangeDateElements?: LastChangeDateElement[],
    ) {
    }
}
