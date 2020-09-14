import {BaseEntity} from '../../../shared/index';

export enum ReceivedProductType {
    'TANKER',
    'PIPE'
}

export class ReceivedProduct implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public receivedProductType?: any,
        public startDate?: any,
        public finishDate?: any,
        public productId?: number,
        public productTitle?: string,
        public inventoryId?: number,
        public inventoryTitle?: string,
        public vehicleId?: string,
        public waybillNumber?: string,
        public driverName?: string,
        public contractorNumber?: number,
        public description?: string,
        public dayDepotId?: number,
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
        public mainDayDepotId?: number,
    ) {
    }
}
