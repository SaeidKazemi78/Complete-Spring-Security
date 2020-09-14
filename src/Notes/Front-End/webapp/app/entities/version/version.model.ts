import {BaseEntity} from './../../shared';

export class Version implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public versionNo?: string,
        public versionDate?: any,
        public description?: string) {
    }
}
