import {BaseEntity} from '../../../shared/index';

export class DayDepotServiceOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public startMeasurementOilTankId?: number,
        public startMeasurementOilTankAmount?: number,
        public startMeasurementOilTankAmountDeep?: number,
        public startMeasurementOilTankSixtyAmount?: number,
        public startMeasurementOilTankSpecialWeight?: number,
        public startMeasurementOilTankEnvironmentTemperature?: number,
        public startMeasurementOilTankProductTemperature?: number,
        public startMeasurementOilTankRegisterDate?: any,
        public endMeasurementOilTankId?: number,
        public endMeasurementOilTankAmount?: number,
        public endMeasurementOilTankAmountDeep?: number,
        public endMeasurementOilTankSixtyAmount?: number,
        public endMeasurementOilTankSpecialWeight?: number,
        public endMeasurementOilTankEnvironmentTemperature?: number,
        public endMeasurementOilTankProductTemperature?: number,
        public endMeasurementOilTankRegisterDate?: number,
        public oilTankServiceId?: number,
        public dayDepotId?: number,
        public mainDayDepotId?: number,
        public mainDayDepotDay?: any,
        public oilTankTitle?: string,
        public oilTankServiceTitle?: string
    ) {
    }
}
