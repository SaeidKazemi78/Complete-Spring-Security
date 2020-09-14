import {BaseEntity} from '../../../shared/index';

export class SendContainerProduct implements BaseEntity {
    constructor(
        public id?: number,
        public sendDate?: any,
        public receivedDate?: any,
        public sendAmount?: number,
        public receivedAmount?: number,
        public sendCount?: number,
        public receivedCount?: number,
        public waybillNumber?: string,
        public inventoryId?: number,
        public driverName?: string,
        public truckNumber?: string,
        public truckSerial?: string,
        public oilTankContainerId?: number,
        public dayDepotContainerId?: number,
    ) {
    }
}
