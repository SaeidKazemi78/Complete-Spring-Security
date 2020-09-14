import {BaseEntity} from '../../shared';

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public plaqueNumber?: string,
        public serial?: string,
        public serialNumber?: string,
        public bakNumber?: string,
        public ownerNationalId?: string,
        public cardNo?: string,
        public cardDate?: any,
        public valveDate?: any,
        public isBlock?: boolean,
        public blockReason?: string,
        public startBlockDate?: any,
        public finishBlockDate?: any,
        public description?: string,
        public permitDate?: any,
        public registerDate?: any,
        public chassisNumber?: string,
        public buildDate?: any,
        public confirmDate?: any,
        public confirmBy?: string,
        public deleted?: boolean,
        public deleteDate?: any,
        public personId?: number,
        public personName?: string,
    ) {
        this.isBlock = false;
        this.deleted = false;
    }
}
