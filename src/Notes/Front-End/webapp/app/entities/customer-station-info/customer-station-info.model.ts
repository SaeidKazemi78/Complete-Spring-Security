import { BaseEntity } from './../../shared';

    export const enum StationType {
            'LIQUID_PRODUCT',
            'CNG_PRODUCT',
            'BOTH'
    }

export class CustomerStationInfo implements BaseEntity {
    constructor(
    public id?: number,
    public stationType?: StationType,
    public hasDispatching?: boolean,
    public hasKahab?: boolean,
    public hasCanopy?: boolean,
    public hasBodyPump?: boolean,
    public hasWorkClothes?: boolean,
    public hasColumns?: boolean,
    public customerId?: number,
    public nozzleProductCounts?: BaseEntity[],
) {
        this.hasDispatching = false;
        this.hasKahab = false;
        this.hasCanopy = false;
        this.hasBodyPump = false;
        this.hasWorkClothes = false;
        this.hasColumns = false;
    }
}
