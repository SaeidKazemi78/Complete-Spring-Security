export class ReportResponseDTO {
    constructor(
        public info: BaseReport,
        public dataList: Array<RateGroupReport>,
        public object: RateGroupReport
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

export class RateGroupReport {
    constructor(
        public title: string,
        public productTitle: string,
        public   count: number,
        public  createdDate: any,
        public  startDate: any,
        public  finishDate: any,
        public username: string,
        public   price: number,
        public locationTitle: string,
    ) {
    }
}

export class RateGroupReportRequest {
    constructor(
        public productId?: number,
        public locationId?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}
