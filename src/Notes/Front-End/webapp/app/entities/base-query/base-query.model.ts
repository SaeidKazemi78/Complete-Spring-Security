import {BaseEntity} from './../../shared';

export enum BaseQueryParameter {
    'DATE',
    'START_DATE',
    'FINISH_DATE',
    'LOCATION',
    'CUSTOMER'
}

export class BaseQuery implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public tempQuery?: string,
        public queryCategory?: string,
        public locationIds?: number[],
        public parameters?: any[]
    ) {
    }
}

export class BaseQueryResult {
    constructor(
        public header?: string[],
        public resultList?: any,
    ) {
    }
}
