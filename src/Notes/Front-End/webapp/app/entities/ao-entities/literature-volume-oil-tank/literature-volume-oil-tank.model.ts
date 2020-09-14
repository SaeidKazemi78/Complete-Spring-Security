import {BaseEntity} from '../../../shared/index';

export class LiteratureVolumeOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public millimeter?: number,
        public centimetre?: number,
        public liter?: number,
        public oilTankId?: number,
        public serviceOilTankId?: number,
        public measureType?: any,
        public oilTankMeasureType?: any,
    ) {
    }
}
