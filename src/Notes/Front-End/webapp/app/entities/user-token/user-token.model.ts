import { BaseEntity } from './../../shared';

export class UserToken implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public ip?: string,
        public lastLoginDate?: any,
        public clientId?: string,
        public accessStatus?: string,
        public netMask?: string

    ) {
    }
}
