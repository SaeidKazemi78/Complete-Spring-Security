import {State} from '@progress/kendo-data-query/dist/npm/state';
import {ReportType} from '../boundary-sell-details-report/boundary-sell-details-report.model';

export class BoundarySellShiftReport {
    constructor(
        public title: string,
        public count: number,
        public amount: number,
        public price: number,
        public productRatePrice: number,
    ) {
    }
}

export class BoundarySellShiftRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public locationIds?: number[],
        public productId?: number,
        public reportType?: any,
        public customerTypeIds?: number[],
        public productIds?: number[],
        public orderType?: any,
        public hasPayment?: boolean
    ) {
    }
}
