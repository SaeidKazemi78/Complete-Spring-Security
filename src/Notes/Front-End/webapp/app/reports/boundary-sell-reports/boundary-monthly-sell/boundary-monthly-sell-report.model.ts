export enum ReportType {
    'SHIFT_DATE',
    'ORDER_DATE',
    'PAYMENT_DATE',
    'CONFIRM_DATE',
    'EXIT_FROM_DEPOT',
    'EXPORT_DATE'

}

export class BoundaryMonthlySellReportResponse {
    constructor(
        public registerDate ?: string,
        public productTitle ?: string,
        public locationName ?: string,
        public orderType ?: string,
        public customerTypeTitle ?: string,
        public totalCount ?: number,
        public totalAmount ?: number,
        public totalDiscountAmount ?: number,
        public totalDiscountPrice ?: number,
        public totalPrice ?: number,
        public alongFuelPrice ?: number,
        public alongFuelAmount ?: number,
        public pumpNozzlePrice ?: number,
        public pumpNozzleAmount ?: number,
    ) {
    }
}

export class BoundaryMonthlySellReportRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public reportType?: any,
        public locationId?: number,
        public orderType?: string,
        public customerTypeId?: number,
        public productId?: number,
        public hasPayment?: boolean,
    ) {
    }
}

