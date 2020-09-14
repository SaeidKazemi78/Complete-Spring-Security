import {BaseEntity} from './../../shared';
import {BankAccount} from '../bank-account';
import {StakeholderType} from './stakeholder.model';

export enum Personality {
    'LEGAL',
    'NATURAL'
}

export enum VerifyStatus {
    'PENDING',
    'ACTIVE',
    'REJECT',
    'DEACTIVE'
}

export enum PersonGroup {
    'CONTRACTOR',
    'NORMAL'
}

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public firstName?: string,
        public lastName?: string,
        public nationalCode?: string,
        public code?: string,
        public fatherName?: string,
        public idCode?: string,
        public telephone?: string,
        public cellphone?: string,
        public fax?: string,
        public email?: string,
        public postalCode?: string,
        public registerNo?: string,
        public creditAccount?: string,
        public costAccount?: string,
        public address?: string,
        public exportHistory?: string,
        public birthday?: any,
        public economicCode?: string,
        public personality?: any,
        public status?: any,
        public salesCodes?: any[],
        public birthRegionId?: number,
        public regionId?: number,
        public countryId?: number,
        public nationalityId?: number,
        public stakeholderId?: number,
        public companyId?: number,
        public sharePercent?: number,
        public stakeholderType?: StakeholderType,
        public fullName?: string,
        public locations?: BaseEntity[],
        public sellContractPeople?: BaseEntity[],
        public username?: string,
        public password?: string,
        public confirmPassword?: string,
        public userEmail?: string,
        public locationSize?: number,
        public invalidData?: boolean,
        public bankAccounts?: BankAccount[],
        public transportCode?: string,
        public personTransportCode?: string,
        public personGroup?: any,
        public activated?: boolean
    ) {
    }
}

export class CustomPerson {
    constructor(
        public name: string,
        public code?: string,
        public telephone?: string,
        public codeLegal?: string,
        public postalCode?: string,
        public registerNo?: string,
        public address?: string,
        public economicCode?: string,
        public region?: string,
        public state?: string,
        public city?: string,
        public faxNumber?: string
    ) {
    }
}
