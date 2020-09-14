import { BaseEntity } from './../../shared';

export class CustomerRating implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public level?: number,
        public fromDate?: any,
        public toDate?: any,
        public fromScore?: number,
        public toScore?: number,
        public locations?: BaseEntity[],
    ) {
    }
}
