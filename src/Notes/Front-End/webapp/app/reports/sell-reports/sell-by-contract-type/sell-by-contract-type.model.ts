import {State} from '@progress/kendo-data-query/dist/npm/state';

export class SellByContractTypeReport {
    constructor(
        public  orderNo?: string,
        public  productTitle?: string,
        public  contractType?: string,
        public  orderType?: string,
        public  amount?: number,
        public  productRatePrice?: number,
    ) {

    }
}

export class SellByContractTypeReportRequest {
    constructor(
        public state?: State,
        public contractNo?: string,
        public nationalId?: string,
        public startDate?: any,
        public finishDate?: any,
        public filterDate?: string,
    ) {
        this.filterDate = 'registerDate';
    }
}
