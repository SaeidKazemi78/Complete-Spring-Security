import {BaseEntity} from './../../shared';
import {CarRfId} from '../car-rf-id';
import {CarTank} from '../car-tank';
import {Location} from '../location';
import {CustomPlaque} from '../plaque';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public postalCode?: string,
        public registerCode?: string,
        public movableCode?: string,
        public registerDate?: any,
        public startDate?: any,
        public finishDate?: any,
        public telephone?: string,
        public cellphone?: string,
        public title?: string,
        public address?: string,
        public buyOneToMany?: boolean,
        public salesPermit?: boolean,
        public identifyCode?: string,
        public gsId?: string,
        public customerVisits?: BaseEntity[],
        public typeId?: number,
        public typeTitle?: string,
        public carRfId?: string,
        public regionId?: number,
        public airplaneModelId?: number,
        public locations?: Location[],
        public carRfIds?: CarRfId[],
        public carTanks?: CarTank[],
        public sellContractCustomers?: BaseEntity[],
        public customerGroupTitle?: any,
        public selfCode?: string,
        public plaque?: string,
        public plaquePart1?: string,
        public plaquePart2?: string,
        public plaquePart3?: string,
        public plaqueTwo?: string,
        public transitPlaque?: string,
        public creditAccount?: string,
        public capacity?: number,
        public productId?: number,
        public productTitle?: string,
        public vehicleModelId?: number,
        public plaqueTemplateTitle?: string,
        public plaqueTwoTemplateTitle?: string,
        public plaqueTemplateCode?: string,
        public plaqueTwoTemplateCode?: string,
        public vehicleModelTitle?: string,
        public typeCode?: string,
        public customPlaque?: CustomPlaque,
        public customPlaqueTwo?: CustomPlaque,
        public regionName?: string,
        public locationName?: string,
        public locationNames?: string,
        public vehicleModelType?: any,
        public refuelCenterIds?: number[],
        public personId?: number,
        public used?: boolean,
        public iranian?: boolean,
        public countryId?: number,
        public valid?: boolean,
        public archive?: boolean,
        public offender?: boolean,
        public attention?: boolean,
        public persons?: PersonCustomer[],

    ) {
        this.buyOneToMany = false;
        this.salesPermit = false;
        this.valid = false;
    }
}

export class BoundaryCustomer implements BaseEntity {
    constructor(
        public id?: number,
        public customerId?: number,
        public oldCustomPlaque?: CustomPlaque,
        public oldCustomPlaqueTwo?: CustomPlaque,
        public newCustomPlaque?: CustomPlaque,
        public newCustomPlaqueTwo?: CustomPlaque,
        public ownerFirstName?: string,
        public ownerLastName?: string,
        public driverFirstName?: string,
        public driverLastName?: string,
        public carVIN?: string,
        public valid?: boolean,

    ) {
        this.valid = false;
    }
}

export class OldCuctomer implements BaseEntity {
    constructor(
        public id?: number,
        public customerName?: string,
        public code?: string,
    ) {

    }
}

export class PersonCustomer{
    constructor(   public personName?: string,
                   public personCode?: string,
                   public sellContractCode?: string,){

    }
}
