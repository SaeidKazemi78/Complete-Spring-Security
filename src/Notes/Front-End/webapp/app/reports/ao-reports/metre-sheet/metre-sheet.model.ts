import {State} from '@progress/kendo-data-query/dist/npm/state';

export class MetreSheet {
    constructor(
        public unitTitle: string,
        public orderNumber: string,
        public createTime: string,
        public customerName: string,
        public productCode: string,
        public productTitle: string,
        public fuelType: string,
        public amount: number,
        public endMetre: number,
        public startMetre: number,
        public differenceEndMetre: number,
        public createDay: any,
        public username: string,
    ) {
    }
}

export class AoRequestModel {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public oilTankId?: number,
        public refuelCenterId?: number,
        public productId?: number,
        public amountGreaterThan?: number,
        public amountSmallerThan?: number,
        public receiptNo?: string,
        public fromReceiptNumber?: string,
        public toReceiptNumber?: string,
        public customerTitle?: string,
        public username?: string,
        public fuelType?: any,
        public isNational?: boolean,
        public buyGroup?: 'CREDIT' | 'CASH',
        public currencyType?: 'NATIONAL' | 'FOREIGN'
    ) {
    }
}
