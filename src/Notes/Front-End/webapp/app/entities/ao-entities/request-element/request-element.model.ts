import {BaseEntity} from '../../../shared/index';

export class RequestElement implements BaseEntity {
    constructor(
        public id?: number,
        public count?: number,
        public requestFilterElementId?: number,
        public lastChangeDateElementId?: number,
        public elementId?: number,
        public elementTitle?: string,
        public elementType?: string
    ) {
    }
}
