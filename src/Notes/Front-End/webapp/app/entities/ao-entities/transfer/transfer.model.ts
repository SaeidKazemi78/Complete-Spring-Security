import {BaseEntity} from '../../../shared/index';

export class Transfer implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public registerDate?: any,
        public natureAmount?: number,
        public sixtyAmount?: number,
        public specialWeight?: number,
        public environmentTemperature?: number,
        public productTemperature?: number,
        public transferByMetre?: boolean,
        public description?: string,
        public metreLogId?: number,
        public transferTypeId?: number,
        public fromDayDepotId?: number,
        public fromOilTankId?: number,
        public fromDayDepotTitle?: string,
        public toDayDepotId?: number,
        public toOilTankId?: number,
        public toDayDepotTitle?: string,
        public metreId?: number,
        public metreTitle?: string,
        public dayDepotId?: number,
        public endMeter?: number,
        public startMeter?: number,
        public mainDayDepotId?: number,
        public mainDayOperationId?: number,
    ) {
        this.transferByMetre = false;
    }
}
