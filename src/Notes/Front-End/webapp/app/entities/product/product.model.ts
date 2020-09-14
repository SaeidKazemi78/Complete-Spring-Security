import {BaseEntity} from './../../shared';

export enum ProductShowStatus {
    'PRODUCT_RATE_DIFFERENCE',
    'NONE',
    'NORMAL'
}

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public title?: string,
        public hasContainer?: boolean,
        public calculateContainerPrice?: boolean,
        public productGroupId?: number,
        public productGroupTitle?: string,
        public productUnitId?: number,
        public containerId?: number,
        public containerTitle?: string,
        public sellContractProducts?: BaseEntity[],
        public productColor?: string,
        public customerGroups?: any[]
    ) {
        this.hasContainer = false;
        this.calculateContainerPrice = false;
    }
}
