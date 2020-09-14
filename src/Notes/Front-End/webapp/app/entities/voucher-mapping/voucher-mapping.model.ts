import {BaseEntity} from './../../shared';

export class VoucherMapping implements BaseEntity {
    constructor(
        public id?: number,
        public extraMap?: any,
        public referenceMap?: any,
        public specialMap?: any,
        public creditMap?: any,
        public debitMap?: any,
        public descriptionMap?: any,
        public accountNoMap?: any,
        public suffixMap?: any,
        public keyMap?: any,
        public baseQueryId?: number,
        public rowNo?: number,
        public baseQueryTitle?: string,
        public voucherTemplateId?: number,
        public localId?: number,
    ) {
    }
}
