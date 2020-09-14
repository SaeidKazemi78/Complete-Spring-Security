export class SevenPage {
    constructor(
        public productName: string,
        public productCode: string,
        public src: string,
        public rate: string,
        public amount: string,
        public totalPrice: string
    ) {
    }
}

export class SevenPageRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public locationId?: number,
        public depotId?: number,
        public productRateDifference?: boolean
    ) {
        this.productRateDifference = true;
    }
}
