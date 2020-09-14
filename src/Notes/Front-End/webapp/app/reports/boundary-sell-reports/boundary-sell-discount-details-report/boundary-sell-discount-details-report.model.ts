
export class ReportResponseDTO {
    constructor(
        public info: BaseReport,
        public dataList: Array<DiscountDetailsDTO>,
        public object: DiscountDetailsDTO
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

export class DiscountDetailsDTO {
    constructor(
    public  discountAmount?: number,
    public  totalDiscount?: number,
    public  locationTitle?: string,
    public  cmr?: string,
    public  customerTitle?: string,
    public  countryTitle?: string
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
