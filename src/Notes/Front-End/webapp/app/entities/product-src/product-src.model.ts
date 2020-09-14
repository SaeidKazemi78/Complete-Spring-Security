import { BaseEntity } from './../../shared';

    export const enum SrcType {
            'NORMAL',
            'PUMP_NOZZLE',
            'TRANSHIP',
            'IRANIAN_BACK',
            'FOREIGN_BACK'
    }

export class ProductSrc implements BaseEntity {
    constructor(
    public id?: number,
    public productId?: number,
    public type?: SrcType,
    public src?: string,
    public startDate?: any,
    public finishDate?: any,
    public ratePrice?: number,
    public productTitle?: string,
    public active?: string
) {
    }
}
