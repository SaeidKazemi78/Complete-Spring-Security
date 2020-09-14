import {BaseEntity} from '../../../shared/index';

export class TransferPlatformToUnit implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public natureAmount?: number,
        public sixtyAmount?: number,
        public specialWeight?: number,
        public environmentTemperature?: number,
        public productTemperature?: number,
        public unitMetreNumber?: number,
        public metreLogId?: number,
        public amount?: number,
        public metreId?: number,
        public metreTitle?: string,
        public platformId?: number,
        public platformTitle?: string,
        public unitId?: number,
        public unitTitle?: string,
        public startMeter?: number,
        public endMeter?: number,
        public mainDayDepotId?: number,
    ) {
    }
}
