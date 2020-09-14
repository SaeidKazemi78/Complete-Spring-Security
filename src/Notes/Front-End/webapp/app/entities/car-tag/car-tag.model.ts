import { BaseEntity } from './../../shared';

export class CarTag implements BaseEntity {
    constructor(
        public id?: number,
        public carRfId?: string,
        public active?: boolean,
        public activeDate?: any,
        public locationId?: number,
    ) {
        this.active = false;
    }
}
