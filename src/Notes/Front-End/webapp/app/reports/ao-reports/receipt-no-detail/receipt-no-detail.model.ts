import {State} from '@progress/kendo-data-query/dist/npm/state';

export class ReceiptNoDetail {
    constructor(
        public  receiptNo: string,
        public  dateTime: any,
        public  airplaneName: string,
        public  airplaneModel: string,
        public  personName: string,
        public  fuelType: string,
        public  currency: string,
        public  productCode: string,
        public  productTitle: string,
        public  username: string,
        public  oilTank: string,
        public  amount: number
    ) {
    }
}

export class ReceiptNoDetailRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number,
    ) {
    }
}
