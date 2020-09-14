import {BaseEntity} from '../../../shared/index';

export class TestResultMapping implements BaseEntity {
    constructor(
        public id?: number,
        public result?: string,
        public baseTestResultId?: number,
        public property?: string,
        public astm?: string,
        public ip?: string,
        public specification?: string,
    ) {
    }
}
