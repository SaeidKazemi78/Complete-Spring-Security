import {BaseEntity} from '../../../shared/index';

export class BaseTestResult implements BaseEntity {
    constructor(
        public id?: number,
        public property?: string,
        public astm?: string,
        public ip?: string,
        public specification?: string,
        public parentBaseTestResultId?: number,
        public parentBaseTestResultType?: any,
    ) {
    }
}
