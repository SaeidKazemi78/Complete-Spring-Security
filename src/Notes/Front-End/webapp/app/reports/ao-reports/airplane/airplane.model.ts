import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Airplane {
    constructor(
        public name: string,
        public model: string,
        public code: string,
        public capacity: number,
        public productTitle: string
    ) {
    }
}

export class AirplaneRequest {
    constructor(
        public state?: State,
    ) {
    }
}
