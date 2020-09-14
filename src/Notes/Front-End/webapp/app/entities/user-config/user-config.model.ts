import { BaseEntity } from './../../shared';

    export const enum TypeOfFuelReceipt {
            'TANKER_SALES',
            'PIPE_LINE_SALES',
            'UNIT_TO_AIRPLANE',
            'UNIT_TO_CUSTOMERS'
    }

export class UserConfig implements BaseEntity {
    constructor(
    public id?: number,
    public username?: string,
    public typeOfFuelReceipt?: TypeOfFuelReceipt,
    public customerId?: number,
    public customerName?: string,
    public depotId?: number,
    public depotTitle?: string,
    public productId?: number,
    public productTitle?: string,
) {
    }
}
