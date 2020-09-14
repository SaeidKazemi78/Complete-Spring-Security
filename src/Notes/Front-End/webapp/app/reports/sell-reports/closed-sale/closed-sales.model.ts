import {State} from '@progress/kendo-data-query/dist/npm/state';

export class ClosedSale {
    constructor(
        public  locationName?: string,
    public orderCount?:number,
    public  productName?: string,
    public  orderDate?: any,
    public  closeDate?: any,
    public   totalPrice?: number,
    public  totalAmount?: number,
    public  totalCost?: number,
    public  totalCredit?: number,
    public  totalPrePay?: number,
    public  totalBillAmount?: number,

) {}
}

export class ClosedSaleRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any

    ) {
    }
}
