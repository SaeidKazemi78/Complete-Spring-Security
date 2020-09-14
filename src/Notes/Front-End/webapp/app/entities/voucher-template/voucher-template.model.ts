import { BaseEntity } from './../../shared';
import {VoucherTypeGroup} from '../voucher-type-group/voucher-type-group.model';

export enum Referrer {
    'BILL',
    'ORDER',
    'NORMAL',
    'VOUCHER_PAYMENT'
}

export enum VoucherDateType {
    'CREATE_DATE',
    'AFTER_MONTH_DAY_FIRST_DATE',
    'LAST_DATE_OF_MONTH',
    'FINISH_DATE'
}

export class VoucherTemplate implements BaseEntity {
    constructor(
    public id?: number,
    public locationIds?: number[],
    public voucherMappings?: BaseEntity[],
    public voucherTypeId?: number,
    public voucherDateType?: any,
    public voucherTypeGroupId?: number,
    public referrer?: any,
    public referenceType?: string,
    public voucherTypeTitle?: string,
    public voucherTypeGroupTitle?: string,
    public access?: string[],
    public docBuildAfterOperations?: string[],
    public docBuildAgents?: string[],
    public docBuildBeforeOperations?: string[],
    public buildAfterVoucherTemplateId?: number,
    public buildAfterVoucherTemplateReversed?: boolean,
    public baseQueryParameters?: string[],
) {
    }
}
