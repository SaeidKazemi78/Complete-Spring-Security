import {BaseEntity} from '../../../shared/index';

export class LastChangeDateElement implements BaseEntity {
    constructor(
        public id?: number,
        public currentModel?: string,
        public lastChangeDate?: any,
        public elementRequestReason?: any,
        public requestFilterElementId?: number,
        public elementId?: number,
        public elementTitle?: string,
        public elementType?: string,
        public elementOriginalModel?: string,
        public elementCount?: number,
    ) {
    }
}
