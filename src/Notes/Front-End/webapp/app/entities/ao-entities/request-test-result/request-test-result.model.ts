import {BaseEntity} from '../../../shared/index';

export const enum RequestStatus {
    'DRAFT',
    'CONFIRM',
    'SEND'
}

export const enum TestResultType {
    'PLUNGING',
    'BASE'
}

export class RequestTestResult implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public date?: any,
        public sampleValue?: number,
        public oilTankInventory?: number,
        public sourceOilTankNumber?: string,
        public requestStatus?: RequestStatus,
        public testResultRequestStatus?: RequestStatus,
        public draftUser?: string,
        public confirmUser?: string,
        public sendUser?: string,
        public electricalConductivity?: string,
        public samplerName?: string,
        public testResultType?: TestResultType,
        public testResultId?: number,
        public oilTankId?: number,
        public refuelCenterId?: number,
    ) {
    }
}
