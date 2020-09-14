
export class ReportResponseDTO {
    constructor(
        public info: BaseReport,
        public dataList: Array<InvoiceSalesDTO>,
        public object: InvoiceSalesDTO
    ) {
    }
}

export class BaseReport {
    constructor(
        public startDate: any,
        public finishDate: any,
        public date: any,
        public orderNo?: string,
        public invoiceNumber?: string,
        public customerAccount?: string,
        public customerName?: string,
        public locationName?: string,
        public issueDate?: any,
        public exitDate?: any,
        public totalAmount?: number,
        public totalPrice?: number,
        public totalAmountP?: string,
        public totalPriceP?: string,
        public username?: string) {

    }
}

export class InvoiceSalesDTO {
    constructor(
        public row?: number,
        public productName?: string,
        public amount?: number,
        public rate?: number,
        public price?: number,
        public tax?: number,
        public cost?: number,
        public orderNo?: string,
        public invoiceNumber?: string,
        public customerAccount?: string,
        public customerName?: string,
        public locationName?: string,
        public issueDate?: any,
        public exitDate?: any,
        public totalAmount?: number,
        public totalPrice?: number,
        public totalAmountP?: string,
        public totalPriceP?: string,
        public username?: string
    ) {
    }
}

export class InvoiceRequestDTO {
    constructor(
        public startDate?: any,
        public endDate?: any,

    ) {
    }
}
