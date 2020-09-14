import {BaseEntity} from '../../shared';
import {Loan} from '../loan';
import {LoanPayment} from '../loan-payment';

export enum InstallmentStatus {
    'PAY',
    'DUE_DATE',
    'NOT_PAY'
}

export class Installment implements BaseEntity {
    constructor(
        public id?: number,
        public price?: number,
        public payPrice?: number,
        public remainingPrice?: number,
        public remainingPenaltyPrice?: number,
        public data?: any,
        public dueData?: any,
        public status?: InstallmentStatus | any
    ) {
    }
}

export class LoanDetail {
    constructor(
        public loan?: Loan,
        public installments?: Installment[],
        public payments?: LoanPayment[]
    ) {
    }
}
