import {BaseEntity} from '../index';

export class Address {
    constructor(
        public address?: string,
        public regionId?: number,
        public exist?: boolean,

    ) {
    }
}
