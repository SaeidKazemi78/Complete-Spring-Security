export class MonthlyReport {
    constructor(
        public productTitle?: any,
        public productRatePrice?: any,
        public amount?: any,
        public date?: any,
        public persianYear?: any,
        public persianMonth?: any,
    ) {
    }
}

export class MonthlyReportRequest {
    constructor(
        public year?: number,
        public month?: number,
        public customerGroups?: any[],
        public customerTypeIds?: any[],
        public customerIds?: any[],
        public regionIds?: any[],
    ) {
    }
}
