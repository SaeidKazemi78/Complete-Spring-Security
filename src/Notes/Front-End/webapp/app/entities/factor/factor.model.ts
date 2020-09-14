import {BaseEntity} from '../../shared';

export enum FactorType {
    'PRICE',
    'COST'
}

export class Factor implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public personId?: number,
        public personFullName?: string,
        public sellContractPersonId?: number,
        public factorNo?: number,
        public startDate?: any,
        public finishDate?: any,
        public price?: number,
        public factorType?: any,
        public active?: boolean,
    ) {
        this.active = false;
    }
}
