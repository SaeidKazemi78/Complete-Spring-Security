import {BaseEntity} from './../../shared';

export class OrderNumber implements BaseEntity {
    constructor(
        public id?: number,
        public startOrderNumber?: number,
        public endOrderNumber?: number,
        public currentOrderNumber?: number,
        public active?: boolean,
        public locationId?: number,
        public refuelCenterId?: number,
    ) {
    }
}
