import { BaseEntity } from './../../shared';

export class ProductGroup implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public color?: string,
    ) {
    }
}
