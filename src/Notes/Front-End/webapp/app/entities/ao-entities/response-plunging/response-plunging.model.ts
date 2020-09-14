import {BaseEntity} from '../../../shared/index';

export class ResponsePlunging implements BaseEntity {
    constructor(
        public id?: number,
        public confirm?: boolean,
        public description?: string,
        public responseDate?: any,
        public isSend?: boolean,
        public requestPlungingId?: number,
    ) {
        this.confirm = false;
        this.isSend = false;
    }
}
