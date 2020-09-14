import { BaseEntity } from './../../shared';

export class Currency implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public isNationalCurrency?: boolean,
        public nationalCurrency?: boolean,
    ) {
        this.isNationalCurrency = null;
    }
}
