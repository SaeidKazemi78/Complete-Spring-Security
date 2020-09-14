import {BaseEntity} from '../../../shared/index';
import {RequestTestResult} from '../request-test-result/index';
import {TestResultMapping} from '../test-result-mapping';

export const enum RequestStatus {
    'DRAFT',
    'CONFIRM',
    'SEND'
}

export class TestResult implements BaseEntity {
    constructor(
        public id?: number,
        public result?: string,
        public requestStatus?: RequestStatus,
        public draftUser?: string,
        public confirmUser?: string,
        public sendUser?: string,
        public requestTestResultId?: number,
        public requestTestResult?: RequestTestResult,
        public testResultMappings?: TestResultMapping[],
        public parentBaseTestResultId?: number,
    ) {
    }
}
