import { BaseEntity } from './../../shared';

export class CostRate implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public startDate1?: any,
        public finishDate?: any,
        public finishDate1?: any,
        public rate?: number,
        public currencyId?: number,
        public costId?: number,
        public stepNo?: number,
        public description?: string,
    ) {
    }
}
