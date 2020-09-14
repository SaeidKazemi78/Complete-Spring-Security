import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';
import {CarTank} from '../../../entities/car-tank';
import {CarRfId} from '../../../entities/car-rf-id';

export class CustomerReport {
    constructor(
        public name?: string,
        public code?: string,
        public postalCode?: string,
        public registerCode?: string,
        public movableCode?: string,
        public registerDate?: any,
        public telephone?: string,
        public buyOneToMany?: boolean,
        public salesPermit?: boolean,
        public identifyCode?: string,
        public gsId?: string,
        public typeTitle?: string,
        public customerGroupTitle?: any,
        public selfCode?: string,
        public plaque?: string,
        public transitPlaque?: string,
        public creditAccount?: string,
        public productTitle?: string,
        public vehicleModelTitle?: string,
    ) {
    }
}

export class CustomerRequest {
    constructor(
        public state?: State,
        public locations?: number[],
        public customerGroup?: any,
        public customerType?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}
