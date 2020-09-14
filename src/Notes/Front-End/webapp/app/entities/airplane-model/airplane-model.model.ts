import { BaseEntity } from './../../shared';

export class AirplaneModel implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public productTitle?: string,
        public capacity?: number,
        public productId?: number,
    ) {
    }
}
