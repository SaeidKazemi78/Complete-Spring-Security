import { BaseEntity } from './../../shared';

    export  enum ActiveMetre {
            'SOURCE',
            'TARGET'
    }

export class TransferType implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
    public transferFrom?: any,
    public transferTo?: any,
    public activeMetre?: ActiveMetre,
    public transferToHimself?: boolean,
) {
        this.transferToHimself = false;
    }
}
