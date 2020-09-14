import {BaseEntity} from './../../shared';

export enum AllocateTagReason {
    NEW, MISSING, DEFECTIVE, ACTIVE
}

export class CarRfId implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public active?: boolean,
        public price?: number,
        public buyDate?: any,
        public customerId?: number,
        public customerName?: string,
        public locationId?: number,
        public locationName?: string,
        public plaque?: string,
        public plaqueTwo?: string,
        public allocateTagReason?: any,
        public description?: string,
        public deActiveDate?: any,
        public activatedDate?: any
    ) {
        this.active = true;
    }
}
