import { BaseEntity } from './../../shared';
import {PosDeviceAccount, PosDeviceServiceType} from '../pos-device';

export class UserPosDevice implements BaseEntity {
    constructor(
    public id?: number,
    public internalIp?: string,
    public name?: string,
    public defaultPos?: boolean,
    public username?: string,
    public posDeviceId?: number,
    public type?: string,
    public active?: boolean,
    public pcId?: string,
    public locationId?: number,
    public serviceTypes?: any[],
    public posDeviceAccounts?: PosDeviceAccount[],

) {
        this.defaultPos = false;
    }
}
