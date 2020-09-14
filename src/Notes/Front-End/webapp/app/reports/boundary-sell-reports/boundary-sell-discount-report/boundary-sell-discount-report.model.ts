
export class ReportResponseDTO {
    constructor(
        public info: BaseReport,
        public dataList: Array<DailyDiscountSalesDTO>,
        public object: DailyDiscountSalesDTO
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

export class DailyDiscountSalesDTO {
    constructor(
    public  orderCount?: number,
    public  discountCount?: number,
    public  locationName?: string,
    public  typeName?: string
    ) {
    }
}

export class BoundarySellDiscountRequestDTO {
    constructor(
        public startDate?: any,
        public endDate?: any,
        public customerTypeId?: number,
        public locationIds?: number[],

    ) {
    }
}
