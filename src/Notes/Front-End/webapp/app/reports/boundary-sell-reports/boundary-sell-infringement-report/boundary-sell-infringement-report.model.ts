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
        public dataList: Array<BoundarySellInfringementReport>,
        public object: BoundarySellInfringementReport
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

export class BoundarySellInfringementReport {
    constructor(
        public registerDate: any,
        public plaque: string,
        public productTitle: string,
        public customerTypeTitle: string,
        public plaqueTwo: string,
        public locationName: string,
        public ownerFullName: string,
        public driverFullName: string,
        public handlingReference: string,
        public infringementType: string,
        public amount: string
    ) {
    }
}

export class BoundarySellInfringementReportRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public customerTypeIds?: number[],
        public locationIds?: number[],
        public productIds?: number[]
    ) {
    }
}
