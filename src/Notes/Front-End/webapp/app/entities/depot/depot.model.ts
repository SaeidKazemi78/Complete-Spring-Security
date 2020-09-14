import {BaseEntity} from './../../shared';
import {RefuelCenter} from '../ao-entities/refuel-center';

export enum DepotType {
    'DEPOT',
    'REFUELING_UNIT'
}

export class Depot implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public code?: string,
                public accCode?: string,
                public depotType?: any,
                public refuelCenterId?: number,
                public locationId?: number,
                public locationName?: string,
                public counterPath?: string,
                public webServiceUrl?: string,
                public motherFinancialCode?: string,
                public products?: BaseEntity[],
                public locations?: BaseEntity[],
                public sellContractProducts?: BaseEntity[],
                public refuelCenter?: RefuelCenter) {
    }
}
