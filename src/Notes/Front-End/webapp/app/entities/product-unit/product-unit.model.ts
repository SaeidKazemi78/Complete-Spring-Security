import { BaseEntity } from './../../shared';

export class ProductUnit implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
    ) {
    }
}
