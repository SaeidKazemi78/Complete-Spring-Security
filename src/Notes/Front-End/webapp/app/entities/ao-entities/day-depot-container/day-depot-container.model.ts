import {BaseEntity} from '../../../shared/index';

export class DayDepotContainer implements BaseEntity {
    constructor(
        public id?: number,
        public deductible?: number,
        public addition?: number,
        public systemAmount?: number,
        public startCount?: number,
        public endCount?: number,
        public capacity?: number,
        public description?: string,
        public oilTankContainerId?: number,
        public mainDayDepotId?: number,
        public title?: string,
        public oilTankTitle?: string,
        public productUnitId?: number,
        public productId?: number
    ) {
    }
}
