import { BaseEntity } from './../../shared';

export enum VoucherMasterStatus {
    'CONFIRM',
    'PENDING'
}

export class VoucherMaster implements BaseEntity {
    constructor(
        public id?: number,
        public locationId?: number,
        public locationTitle?: string,
        public title?: string,
        public confirmDate?: any,
        public userConfirm?: string,
        public docNumber?: string,
        public docDate?: any,
        public description?: string,
        public status?: any,
        public voucherItems?: BaseEntity[],
        public voucherTypeId?: number,
        public voucherTypeTitle?: number
    ) {
    }
}

export class VoucherMasterConfirm implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string
    ) {
    }
}
