import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public enName?: string,
        public isoCode?: string,
        public isoCode2?: string,
        public code?: string,
        public rmtoCode?: string,
        public neighbor?: boolean,
        public checkNationalCode?: boolean,
    ) {
        this.checkNationalCode = false;
    }
}
