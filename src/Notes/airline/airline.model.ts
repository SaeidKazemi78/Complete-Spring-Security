import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Airline {
    constructor(
        public name: string,
        public code: string,
        public creditAccount: string,
    ) {
    }
}

export class AirlineRequest {
    constructor(
        public state?: State,
    ) {
    }
}
