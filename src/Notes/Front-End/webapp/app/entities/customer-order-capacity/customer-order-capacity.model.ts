import {BaseEntity} from './../../shared';

export class CustomerOrderCapacity implements BaseEntity {
    constructor(public id?: number,
                public capacity?: number,
                public personTransportCode?: string,
                public productGroupTitle?: string,
                public registerType?: any,
                public active?: boolean,
                public customerId?: number,
    ) {
    }
}
