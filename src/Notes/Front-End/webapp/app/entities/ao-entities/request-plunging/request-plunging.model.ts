import {BaseEntity} from '../../../shared/index';

export class RequestPlunging implements BaseEntity {
    constructor(
        public id?: number,
        public requestDate?: any,
        public description?: string,
        public isSend?: boolean,
    ) {
        this.isSend = false;
    }
}
