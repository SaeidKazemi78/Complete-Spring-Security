import {BaseEntity} from './../../shared';

export  enum TransferFuelType {
    'TANKER',
    'PIPE'
}

export  enum WayBillType {
    'SEND',
    'RECEIVE'
}

export class WayBill implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public wayBillNumber?: string,
        public natureAmount?: number,
        public sixtyAmount?: number,
        public specialWeight?: number,
        public environmentTemperature?: number,
        public productTemperature?: number,
        public sourceDepotId?: number,
        public targetDepotId?: number,
        public driverId?: number,
        public carId?: number,
        public personId?: number,
        public routeId?: number,
        public transferFuelType?: any,
        public wayBillType?: any,
        public description?: string,
        public dayDepotId?: number,
        public weight?: number,
        public receivedWeight?: number,
        public receivedNatureAmount?: number,
        public receivedSixtyAmount?: number,
        public receivedSpecialWeight?: number,
        public receivedEnvironmentTemperature?: number,
        public receivedProductTemperature?: number,
        public orderId?: number,
        public productId?: number,
        public metreLogId?: number,
        public endMeter?: number,
        public startMeter?: number,
        public metreId?: number,
        public metreTitle?: number,
        public metreAmount?: number,
        public differenceAmount?: number,
        public differenceSixtyAmount?: number,
        public sealUses?: any[],
    ) {
    }
}
