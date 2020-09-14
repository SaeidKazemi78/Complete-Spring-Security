import { BaseEntity } from './../../shared';

export class ReservoirCapacity implements BaseEntity {
    constructor(
        public id?: number,
        public capacity?: number,
        public active?: boolean,
        public productId?: number,
        public personId?: number,
        public productTitle?: string,
        public personName?: string
    ) {
        this.active = false;
    }
}
