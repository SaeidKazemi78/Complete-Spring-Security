import { BaseEntity } from './../../shared';

export class Container implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public capacity?: number,
        public productUnitId?: number,
    ) {
    }
}
