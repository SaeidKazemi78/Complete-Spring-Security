import { BaseEntity } from './../../shared';

export class UserAccConfig implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public accUsername?: string,
        public financialYear?: number,
        public tempDocNumber?: number,
    ) {
    }
}
