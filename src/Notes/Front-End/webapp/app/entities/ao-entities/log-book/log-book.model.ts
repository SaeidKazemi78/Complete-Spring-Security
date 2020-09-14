import {BaseEntity} from '../../../shared/index';
import {MetreLog} from '../metre-log';

export enum FuelType {
    'RE_FUEL',
    'DE_FUEL'
}

export class LogBook implements BaseEntity {
    constructor(
        public id?: number,
        public orderId?: number,
        public orderNo?: string,
        public customerTitle?: string,
        public personTitle?: string,
        public fuelReceipt?: string,
        public amount?: number,
        public fuelType?: string,
        public status?: boolean,
        public metreLogId?: number,
        public orderProductId?: number,
        public metreLog?: MetreLog,
        public dayDepotId?: number,
        public dayDepotTitle?: string,
    ) {

    }
}
