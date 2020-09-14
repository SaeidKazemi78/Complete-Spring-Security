import {BaseEntity} from '../../../shared/index';

export const enum BaseTestResultType {
    'WATER_TYPE',
    'OIL_TYPE'
}

export const enum TestResultType {
    'PLUNGING',
    'BASE',
    'MICROB'
}

export class ParentBaseTestResult implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public productTitle?: string,
        public baseTestResultType?: BaseTestResultType | any,
        public testResultType?: TestResultType | any,
    ) {
    }
}
