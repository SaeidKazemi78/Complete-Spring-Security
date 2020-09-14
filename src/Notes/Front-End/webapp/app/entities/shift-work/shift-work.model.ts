import {BaseEntity} from './../../shared';
import {OrderNumber} from '../location';

export class ShiftWork implements BaseEntity {
    constructor(
        public id?: number,
        public fromDate?: any,
        public toDate?: any,
        public locationId?: number,
        public refuelCenterId?: number,
        public canOpen?: any,
        public type?: string,
        public shiftType?: string,
        public orderNumber?: OrderNumber
    ) {
    }
}
