import {State} from '@progress/kendo-data-query/dist/npm/state';

export class BoundarySellReport {
    constructor(
        public orderNo: string,
        public carnet: string,
        public cmr: string,
        public registerDate: any,
        public confirmedDate: any,
        public price: number,
        public totalDiscountPrice: number,
        public totalAmount: number,
        public plaque: string,
        public vehicleModelTitle: string,
        public plaqueTitle: string,
        public currencyTitle: string,
        public currencyRateGroupTitle: string,
        public productTitle: string,
        public receiptNoTitle: string,
    ) {
    }
}

export class BoundarySellReportRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public orderType?: any,
        public transhipType?: any,
        public plaque?: string,
        public carRfId?: string,
        public locationIds?: number[],
        public customerType?: any,
    ) {
    }
}
