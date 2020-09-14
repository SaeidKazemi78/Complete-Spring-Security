import {BaseEntity} from '../../../shared/index';

export class MeasurementOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public amountDeep?: number,
        public sixtyAmount?: number,
        public specialWeight?: number,
        public environmentTemperature?: number,
        public productTemperature?: number,
        public registerDate?: any,
        public oilTankId?: number,
    ) {
    }
}
