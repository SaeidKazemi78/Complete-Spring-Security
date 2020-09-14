import {BaseEntity} from '../../../shared/index';

export class ReceivedProductContainer implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public inventoryId?: number,
        public truckNumber?: string,
        public truckSerial?: string,
        public waybillNumber?: string,
        public driverName?: string,
        public contractorNumber?: number,
        public sendCount?: number,
        public receiveCount?: number,
        public description?: string,
        public oilTankContainerId?: number,
        public dayDepotContainerId?: number,
    ) {
    }
}
