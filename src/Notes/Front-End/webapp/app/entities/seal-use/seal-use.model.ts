import { BaseEntity } from './../../shared';

export const enum SealUseReason {
    'WAYBILL',
    'ESCAPE',
    'OTHER'
}

export class SealUse implements BaseEntity {
    constructor(
        public id?: number,
        public sealNumber?: number,
        public sealPrefix?: string,
        public boxNo?: string,
        public sealUseReason?: SealUseReason,
        public sealId?: number,
        public wayBillId?: number,
    ) {
    }
}
