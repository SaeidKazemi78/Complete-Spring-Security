export enum ReportType {
    'SHIFT_DATE',
    'ORDER_DATE',
    'PAYMENT_DATE',
    'CONFIRM_DATE',
    'EXIT_FROM_DEPOT',
    'EXPORT_DATE'

}

export class ReportResponseDTO {
    constructor(
        public info: BaseReport,
        public dataList: Array<BoundaryDetailsSellReport>,
        public object: BoundaryDetailsSellReport
    ) {
    }
}

export class BaseReport {
    constructor(
        public startDate: any,
        public finishDate: any,
        public date: any) {

    }
}

export class BoundaryDetailsSellReport {
    constructor(
        public orderNo: string,
        public registerDate: any,
        public startShiftDate: any,
        public endShiftDate: any,
        public plaque: string,
        public productTitle: string,
        public customerTypeTitle: string,
        public alongAmount: number,
        public alongPrice: number,
        public pumpNozzleAmount: number,
        public pumpNozzleAmountPrice: number,
        public totalPrice: number,
        public totalDiscountPrice: number,
        public totalDiscountAmount: number,
        public receiptNo: string,
    ) {
    }
}

export class BoundaryDetailsSellReportRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public orderType?: any,
        public searchRfId?: any,
        public searchPlaque?: any,
        public customerTypeIds?: number[],
        public reportType?: any,
        public locationIds?: number[],
        public productIds?: number[],
        public hasPayment?: boolean
    ) {
    }
}
