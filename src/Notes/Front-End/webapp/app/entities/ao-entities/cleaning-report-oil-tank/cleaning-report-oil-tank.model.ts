import {BaseEntity} from '../../../shared/index';

export const enum TypeOfAlloy {
    'AL',
    'SS',
    'CS'
}

export const enum CleaningType {
    'PERIODIC_TANK_INSPECTION',
    'CLEANING',
    'MODIFICATION_OR_REPAIRING'
}

export const enum RequestStatus {
    'DRAFT',
    'CONFIRM',
    'SEND'
}

export class CleaningReportOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public typeOfAlloy?: TypeOfAlloy,
        public periodicTankInspection?: boolean,
        public cleaningType?: CleaningType,
        public cleaningReportNumber?: string,
        public registerDate?: any,
        public exporterName?: string,
        public highLevelSensor?: boolean,
        public pAndVValue?: boolean,
        public manhole?: boolean,
        public dipStick?: boolean,
        public flameTrap?: boolean,
        public contentGauge?: boolean,
        public footValue?: boolean,
        public drainSump?: boolean,
        public sampleDrainValue?: boolean,
        public description?: string,
        public confirm?: boolean,
        public requestStatus?: RequestStatus,
        public draftUser?: string,
        public confirmUser?: string,
        public sendUser?: string,
        public oilTankId?: number,
        public oilTankTitle?: string,
        public refuelCenterId?: number,
        public refuelCenterPersianTitle?: string,
    ) {
        this.periodicTankInspection = false;
        this.highLevelSensor = false;
        this.pAndVValue = false;
        this.manhole = false;
        this.dipStick = false;
        this.flameTrap = false;
        this.contentGauge = false;
        this.footValue = false;
        this.drainSump = false;
        this.sampleDrainValue = false;
        this.confirm = false;
    }
}
