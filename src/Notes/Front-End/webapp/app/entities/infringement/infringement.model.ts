import {BaseEntity} from './../../shared';

export enum InfringementType {
    'EMBEDDED',
    'UNAUTHORIZED_BUCK',
    'CARRYING_STUFF',
    'OTHER'
}

export class Infringement implements BaseEntity {
    constructor(public id?: number,
                public amount?: number,
                public description?: string,
                public deActiveDescription?: string,
                public driverFullName?: string,
                public driverFirstName?: string,
                public driverLastName?: string,
                public ownerFullName?: string,
                public ownerFirstName?: string,
                public ownerLastName?: string,
                public ownerNationalCode?: string,
                public driverNationalCode?: string,
                public infringementType?: any,
                public handlingReference?: string,
                public productId?: number,
                public customerId?: number,
                public productTitle?: string,
                public locationId?: number,
                public locationName?: string,
                public fileId?: number,
                public active?: boolean) {
    }
}

