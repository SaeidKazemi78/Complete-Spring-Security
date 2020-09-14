import {BaseEntity} from './../../shared';

export class Region implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public level?: number,
        public globalCode?: string,
        public subRegions?: Region[],
        public countryId?: number,
        public parentId?: number,
        public locations?: any,
        public parentCode?: string,
    ) {
    }
}
