import {BaseEntity} from '../../../shared/index';

export class MainDayDepot implements BaseEntity {
    constructor(
        public id?: number,
        public deductible?: number,
        public addition?: number,
        public day?: any,
        public description?: string,
        public refuelCenterId?: number,
        public close?: boolean
    ) {
    }
}
