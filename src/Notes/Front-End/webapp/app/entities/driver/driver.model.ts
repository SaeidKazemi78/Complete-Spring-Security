import { BaseEntity } from './../../shared';

export class Driver implements BaseEntity {
    constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public birthCertificateNumber?: string,
    public drivingLicenseTypeCode?: string,
    public drivingLicenseNumber?: string,
    public drivingLicenseIssueDate?: any,
    public drivingLicenseExpireDate?: any,
    public expireViolationDate?: any,
    public smartCardNumber?: string,
    public active?: boolean,
    public mainDriver?: boolean,
    public description?: string,
    public pictureContentType?: string,
    public picture?: any,
    public satisfactionWeight?: number,
    public desiredLengthWeight?: number,
    public behaviourWeight?: number,
    public birthCityId?: number,
    public carId?: number,
) {
        this.active = false;
        this.mainDriver = false;
    }
}

export  enum Religion {
    'JEWISH',
    'CHRISTIAN',
    'SHIA',
    'SUNNI',
    'ZOROASTRIANISM'
}

export  enum Education {
    'UNDER_DIPLOMA',
    'DIPLOMA',
    'ASSOCIATE',
    'BACHELOR',
    'MASTER',
    'PHD'
}

export  enum MaritalStatus {
    'SINGLE',
    'MARRIED'
}

export  enum MilitaryStatus {
    'COMPLETE',
    'EXEMPT'
}

export class DriveSecurity implements BaseEntity {
    constructor(
        public id?: number,
        public birthDate?: any,
        public height?: number,
        public weight?: number,
        public eyeColor?: string,
        public hairColor?: string,
        public nationalId?: string,
        public fatherName?: string,
        public religion?: Religion,
        public education?: Education,
        public maritalStatus?: MaritalStatus,
        public militaryStatus?: MilitaryStatus,
        public exemptMilitaryReason?: string,
        public haveCriminal?: boolean,
        public criminalReason?: boolean,
        public address?: string,
        public postalCode?: string,
        public mobileNumber?: string,
        public phoneNumber?: string,
        public fileName?: string,
        public description?: string,
        public inCompleteDocument?: string,
        public serial?: string,
        public isGuest?: boolean,
        public driverId?: number,
        public nationalityId?: number,
    ) {
        this.haveCriminal = false;
        this.criminalReason = false;
        this.isGuest = false;
    }
}
