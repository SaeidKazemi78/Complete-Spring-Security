import {BaseEntity} from './../../shared';

export class RoleLevel implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string
    ) {
    }
}
