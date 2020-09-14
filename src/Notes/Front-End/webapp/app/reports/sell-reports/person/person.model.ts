import {State} from '@progress/kendo-data-query/dist/npm/state';

export class PersonReport {
    constructor(
        public name?: string,
        public firstName?: string,
        public lastName?: string,
        public fatherName?: string,
        public fullName?: string,
        public postalCode?: string,
        public code?: string,
        public email?: string,
        public birthRegionTitle?: string,
        public birthDay?: any,
        public createdDate?: any,
        public costAccount?: string,
        public creditAccount?: string,
        public cellPhone?: string,
        public economicCode?: string,
        public registerNo?: string,
        public status?: string,
        public telephone?: string,
        public nationality?: string,
        public country?: string
    ) {
    }
}

export class PersonRequest {
    constructor(
        public state?: State,
        public countryId?: number,
        public personality?: any,
        public regionId?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}

export enum Personality {
    'LEGAL',
    'NATURAL'
}
