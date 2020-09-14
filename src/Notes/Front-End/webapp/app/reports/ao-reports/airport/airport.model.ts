import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Airport {
    constructor(
        public persianTitle: string,
        public englishTitle: string,
        public code: string,
        public globalCode: string,
        public regionName: string,
        public countryName: string,
        public checkNational: boolean,

    ) {
    }
}

export class AirportRequest {
    constructor(
        public state?: State,
    ) {
    }
}
