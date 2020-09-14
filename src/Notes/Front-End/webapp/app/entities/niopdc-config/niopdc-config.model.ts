import {BaseEntity} from './../../shared';

export enum ConfigType {
    'BOUNDARY_SELL',
    'NORMAL_SELL',
    'NIOPDC_AO',
    'INVOICE'
}

export class NiopdcConfig implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public finishDate?: any,
        public boundaryCurrencyRateGroupId?: number,
        public transferTypeId?: number,
        public invoiceCounterOffset?: number,
        public boundaryCurrencies?: number[],
        public transferTypeContaminateIds?: number[],
        public configType?: string
    ) {
    }
}
