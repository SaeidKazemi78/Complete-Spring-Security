import {BaseEntity} from './../../shared';

export enum ExportPiType {
    '',
    'CREDIT',
    'CASH'
}

export class ExportPi implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public piNumber?: string,
        public price?: number,
        public amount?: number,
        public exportLetterId?: number,
        public type?: ExportPiType | any,
        public productId?: number,
        public productTitle?: string,
        public payments?: BaseEntity[],
        public active?: boolean,
    ) {
    }
}
