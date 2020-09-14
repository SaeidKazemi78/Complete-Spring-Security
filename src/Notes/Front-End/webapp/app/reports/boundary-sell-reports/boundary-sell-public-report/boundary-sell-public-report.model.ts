import {State} from '@progress/kendo-data-query/dist/npm/state';
import {ReportType} from '../boundary-sell-details-report/boundary-sell-details-report.model';

export class BoundarySellPublicReport {
    constructor(
        public title: string,
        public count: number,
        public amount: number,
        public price: number,
        public productRatePrice: number,
    ) {
    }
}

export class BoundarySellPublicRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public regionIds?: number[],
        public locationIds?: number[],
        public areaIds?: number[],
        public productId?: number,
        public customerTypeIds?: number[],
        public discountTypeIds?: number[],
        public productIds?: number[],
        public orderType?: any,
    ) {
    }
}
