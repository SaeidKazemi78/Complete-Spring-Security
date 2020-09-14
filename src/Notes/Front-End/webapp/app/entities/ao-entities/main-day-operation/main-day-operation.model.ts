import {BaseEntity} from '../../../shared/index';

export class MainDayOperation implements BaseEntity {
    constructor(
        public id?: number,
        public day?: any,
        public close?: boolean,
        public description?: string,
        public refuelCenterId?: number,
    ) {
        this.close = false;
    }
}
