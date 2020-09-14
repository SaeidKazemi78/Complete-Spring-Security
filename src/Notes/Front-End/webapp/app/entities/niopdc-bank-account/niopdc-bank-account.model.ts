import { BaseEntity } from './../../shared';
import {Bank} from '../payment';

export class NiopdcBankAccount implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public accountNumber?: string,
        public locationIds?: number[],
        public bankAccountTypes?: BaseEntity[],
        public bank?: Bank | string,
        public mellatExtCustomerId?: string,
        public mellatUsername?: string,
        public mellatPassword?: string,
        public mellatTerminalId?: string,
        public accountIdentifier?: string
    ) {
    }
}
