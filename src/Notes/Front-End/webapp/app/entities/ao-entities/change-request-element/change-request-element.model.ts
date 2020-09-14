import {BaseEntity} from '../../../shared/index';

export class ChangeRequestElement implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public originalModel?: string,
        public count?: number,
        public currentModel?: string,
        public lastChangeDate?: string,
        public elementRequestReason?: string,
        public model?: string,
        public walked?: number,
        public changeFilterElementId?: number,
        public requestElementId?: number,
    ) {
    }
}
