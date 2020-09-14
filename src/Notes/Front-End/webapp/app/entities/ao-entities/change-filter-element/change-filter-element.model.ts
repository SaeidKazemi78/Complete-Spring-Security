import {BaseEntity} from '../../../shared';

export const enum RequestStatus {
    'DRAFT',
    'CONFIRM',
    'SEND'
}

export const enum ResponseStatus {
    'CONFIRM',
    'REJECT'
}

export class ChangeFilterElement implements BaseEntity {
    constructor(
        public id?: number,
        public conditionOfCartridges?: boolean,
        public conditionOfSeals?: boolean,
        public conditionOfCoating?: boolean,
        public pdGauge?: boolean,
        public airEliminator?: boolean,
        public reliefValue?: boolean,
        public sampleDrainValue?: boolean,
        public namePlate?: boolean,
        public requestStatus?: RequestStatus,
        public draftUser?: string,
        public confirmUser?: string,
        public sendUser?: string,
        public description?: string,
        public pdReading?: number,
        public flowTest?: number,
        public responseStatus?: ResponseStatus | any,
        public requestFilterElementId?: number,
        public requestFilterElement?: any,
        public changeRequestElements ?: any[],
    ) {
        this.conditionOfCartridges = false;
        this.conditionOfSeals = false;
        this.conditionOfCoating = false;
        this.pdGauge = false;
        this.airEliminator = false;
        this.reliefValue = false;
        this.sampleDrainValue = false;
        this.namePlate = false;
    }
}
