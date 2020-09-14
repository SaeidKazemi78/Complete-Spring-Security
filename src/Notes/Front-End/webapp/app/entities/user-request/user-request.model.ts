import {BaseEntity} from 'app/shared';

export enum UserType {
    'HEAD',
    'AREA',
    'ZONE',
    'BOUNDARY',
    'PERSON',
    'REFUEL_CENTER',
    'DEPOT',
    'PROP'
}

export enum Organization {
    'NIOPDC',
    'PERSONAL_CORPORATIONS',
    'PERSONAL'
}

export enum DegreeOfEducation {
    'MIDDLE_SCHOOL',
    'DIPLOMA',
    'ASSOCIATE',
    'BACHELORS',
    'MA',
    'PHD'
}

export enum EmploymentStatus {
    'OFFICIAL',
    'TEMPORARYـCONTRACT',
    'DEFINITEـCONTRACT',
    'CONTRACTING',
    'OTHERS'
}

export class UserRequest implements BaseEntity {
    constructor(
        public id?: number,
        public roleId?: number,
        public firstName?: string,
        public lastName?: string,
        public fatherName?: string,
        public nationalCode?: string,
        public trackingCode?: string,
        public cellPhone?: string,
        public email?: string,
        public birthday?: any,
        public idCode?: string,
        public organization?: any,
        public locationId?: number,
        public section?: string,
        public degreeOfEducation?: any,
        public employmentStatus?: any,
        public personnelCode?: string,
        public jobTitle?: string,
        public role?: any,
        public userType?: any,
        public login?: string,
        public confirmed?: boolean,
        public password?: string,
        public valid?: boolean,
        public createAfterLogin?: boolean,
        public serviceKind?:any,
        public serviceLocation?:any,
        public companyName?:any,
        public contractNo?:any,
        public boundaryId?:any
    ) {
        this.createAfterLogin = false;
    }
}
