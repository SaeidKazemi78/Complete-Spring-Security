import {BaseEntity} from './../../shared';
import {Location} from '../location';
import {Country} from '../country';

export class BoundaryDiscount implements BaseEntity {
    constructor(
        public id?: number,
        public liter?: number,
        public location ?: Location,
        public country ?: Country,
        public vehicleModelType ?: string,
        public locationTitle?: string,
        public countryTitle?: string,
        public startDate?: any,
        public finishDate?: any,
        public title?: any,
        public driverFirstName?: string,
        public driverLastName?: string,
        public transitHourLimit?: number,
        public message?:string

    ) {
    }
}

export class InquiryCmr {
    constructor(
        public boundaryDiscount?: BoundaryDiscount,
        public country?: Country,
        public driverFirstName?: string,
        public driverLastName?: string
    ) {
    }
}
