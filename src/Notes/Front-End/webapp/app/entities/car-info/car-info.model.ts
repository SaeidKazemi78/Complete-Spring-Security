import {BaseEntity} from './../../shared';

export class CarInfo implements BaseEntity {
    constructor(
    public id?: number,
    public physicalInsuranceNo?: string,
    public physicalInsuranceExpireDate?: any,
    public thirdPartyInsuranceNo?: string,
    public thirdPartyInsuranceExpireDate?: any,
    public registerDate?: any,
    public wayBillCardSerial?: string,
    public fromDate?: any,
    public toDate?: any,
    public carId?: number,
    public capacity?: number,
    public sealNumber?: number,
) {
    }
}
