import {BaseEntity} from '../../../shared/index';

export class Filter implements BaseEntity {
    constructor(
        public id?: number,
        public capacity?: number,
        public title?: string,
        public detail?: string,
        public lastVisitDate?: any,
        public debiOperation?: string,
        public isActive?: boolean,
        public refuelCenterId?: number,
        public manufactureId?: number,
    ) {
        this.isActive = false;
    }
}
