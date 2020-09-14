import { BaseEntity } from './../../shared';

export class SalesCode implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public receivedDate?: any,
        public personId?: number,
    ) {
    }
}
