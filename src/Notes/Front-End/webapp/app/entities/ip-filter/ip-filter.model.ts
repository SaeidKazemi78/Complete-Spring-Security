import { BaseEntity } from './../../shared';

export class IpFilter implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public ip?: string,
        public accessStatus?: number,
        public netMask?: string,
    ) {
    }
}
