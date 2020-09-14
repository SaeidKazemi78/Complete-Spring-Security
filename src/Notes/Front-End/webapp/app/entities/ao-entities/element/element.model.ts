import {BaseEntity} from '../../../shared/index';

export enum ElementRequestReason {
    'MAX_DIFF',
    'MAX_TIME_ELAPSED',
    'UNACCEPTABLE_DROP',
    'UNACCEPTABLE_RESULT',
    'ABNORMAL_RESULT',
    'TEARING_ELEMENT',
    'SUDDEN_DROP'
}

export enum ElementType {
    'COALESCER',
    'MICROFILTER',
    'SEPARATOR',
    'MONITOR',
    'CLAY'
}

export class Element implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public originalModel?: string,
        public currentModel?: string,
        public elementRequestReason?: ElementRequestReason,
        public lastChangeDate?: any,
        public elementType?: ElementType,
        public filterId?: number,
        public count?: number,
    ) {
    }
}
