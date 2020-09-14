import {BaseEntity} from '../../../shared/index';

export class SendProduct implements BaseEntity {
    constructor(
        public id?: number,
        public sendDate?: any,
        public receivedDate?: any,
        public waybillNumber?: string,
        public driverName?: string,
        public vehicleId?: string,
        public dayDepotId?: number,
        public oilTankId?: number,
        public oilTankTitle?: string,
        public receivedNatureAmount?: number,
        public receivedSixtyAmount?: number,
        public receivedSpecialWeight?: number,
        public receivedEnvironmentTemperature?: number,
        public receivedProductTemperature?: number,
        public sendNatureAmount?: number,
        public sendSixtyAmount?: number,
        public sendSpecialWeight?: number,
        public sendEnvironmentTemperature?: number,
        public sendProductTemperature?: number,
        public inventoryId?: number,
        public mainDayDepotId?: number,
    ) {
    }
}
