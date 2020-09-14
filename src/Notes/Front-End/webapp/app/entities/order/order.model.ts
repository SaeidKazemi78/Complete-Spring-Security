import {BaseEntity} from './../../shared';
import {CostAction, CostRelated, CostType} from '../cost/cost.model';
import {CarTank} from '../car-tank';
import {BuyGroup} from '../buy-type';
import {VehicleModelType} from '../vehicle-model';

export enum ReceiptType {
    'CUSTOMER',
    'CUSTOMHOUSE',
    'ARCHIVES',
    'ALL'
}

export enum OrderStatus {
    'DRAFT',
    'DE_ACTIVE',
    'PENDING',
    'PAID',
    'CREDIT_PAID',
    'PAID_PUMP',
    'CONFIRM',
    'SEND_TO_DEPOT',
    'EXIT_FROM_DEPOT',
    'BACK_FROM_SALE',
    'REVOCATION',
    'BACK_FROM_DEPOT',
    'CUSTOMS_CONFIRM',
    'BORDER_CONFIRM',
    'WAY_BILL',
    'TICKET'
}

export enum DepotStatus {
    'SEND_TO_DEPOT',
    'EXIT_FROM_DEPOT',
    'BACK_FROM_DEPOT',
    'OVER_TURN',
    'DEPARTURE',
    'BACK_FROM_SALE'
}

export enum FlightConditions {
    'VIP',
    'EMERGENCY',
    'NORMAL'
}

export enum TypeOfFuelReceipt {
    'TANKER_SALES',
    'PIPE_LINE_SALES',
    'UNIT_TO_AIRPLANE',
    'UNIT_TO_CUSTOMERS'
}

export enum CreditNotDepositedInTime {
    'SELL_LIMIT',
    'SELL_ALARM',
    'OK'
}

export enum OrderType {
    'AIRPLANE',
    'ORDER',
    'BOUNDARY_TRANSIT',
    'BOUNDARY_TRANSHIP',
    'REFUEL_CENTER'
}

export enum OrderCreationMethod {
    'WEB_SITE',
    'MEASURING_DEVICE',
    'WINDOWS_SOFT',
}

export const enum BuyTypeUsage {
    'COST',
    'PRODUCT',
    'BOTH'
}

export class Order implements BaseEntity {
    constructor(public id?: number,
                public customerId?: number,
                public customerTitle?: string,
                public customerTypeId?: string,
                public customerGroupTitle?: any,
                public customerName?: string,
                public customerCode?: string,
                public personId?: number,
                public sellContractId?: number,
                public sellContractNumber?: string,
                public personTitle?: string,
                public personName?: string,
                public locationId?: number,
                public locationTitle?: string,
                public locationName?: string,
                public orderNo?: string,
                public registerDate?: any | Date,
                public lastModifiedDate?: any,
                public price?: number,
                public amount?: number,
                public productPrice?: number,
                public containerPrice?: number,
                public costPrice?: number,
                public expires?: number,
                public status?: OrderStatus | string,
                public currencyId?: number,
                public currencyTitle?: string,
                public CurrencyRateGroupTitle?: string,
                public modifyStatusDate?: any,
                public depotId?: number,
                public depotTitle?: string,
                public sellContractProductIds?: number[],
                public orderProducts?: OrderProduct[],
                public orderCredits?: OrderCredit[],
                public productIds?: number[],
                public productId?: number,
                public currencyRateGroupId?: number,
                public TypeId?: number,
                public buyGroup?: any,
                public flightConditions?: any,
                public sourceAirport?: number,
                public targetAirport?: number,
                public targetCountryId?: number,
                public cmr?: number,
                public carnet?: number,
                public orderType?: string,
                public pumpNozzleAmount?: number,
                public shiftWorkId?: number,
                public mainDayDepotId?: number,
                public mainDayOperationId?: number,
                public typeOfFuelReceipt?: any,
                public vehicleModelId?: number,
                public printCount?: number,
                public description?: string,
                public productTitle?: string,
                public unitTitle?: string,
                public plaque?: string,
                public disableEdit?: boolean,
                public firstName?: string,
                public lastName?: string,
                public fuelType?: any,
                public sellContractProducts?: any,
                public customerGroup?: any,
                public orderPrePays?: OrderPrePay[],
                public payId?: string,
                public userFullName?: string,
                public flightNumber?: string,
                public depotStatus?: any,
                public createBankTransaction ?: boolean,
                public multiPrePay ?: boolean,
                public countCopy ?: number) {
        this.countCopy = 1;
    }
}

export class ForcibleOrder {
    constructor(
        public id?: number,
        public locationCode?: string,
        public locationId?: number,
        public customerCode?: string,
        public customerId?: number,
        public productId?: number,
        public productCode?: string,
        public status?: any,
        public sixtyAmount?: number,
        public natureAmount?: number,
        public realDepotId?: number,
        public complete?: boolean,
        public sourceOrderId?: number,
        public targetOrderId?: number,
    ){}
}

export class OrderProduct implements BaseEntity {
    constructor(
        public id?: number,
        public sellContractProductId?: number,
        public productId?: number,
        public productTitle?: string,
        public productColor?: string,
        public rateGroupId?: number,
        public totalPrice?: number,
        public basePrice?: number,
        public containerBasePrice?: number,
        public sellContractProductTitle?: String,
        public rateGroupTitle?: String,
        public buyGroups?: BuyGroup[],
        public price?: number,
        public ratePrice?: number,
        public currentPrice?: number,
        public productCost?: number,
        public currentProductCost?: number,
        public productRatePrice?: number,
        public productRateId?: number,
        public containerRateId?: number,
        public containerRatePrice?: number,
        public costPrice?: number,
        public amount?: number,
        public containerCount?: number,
        public currentAmount?: number,
        public orderId?: number,
        public measureHeight?: number,
        public height?: number,
        public primitiveHeight?: number,
        public pumpNozzleAmount?: number,
        public carTankId?: number,
        public carTank?: CarTank,
        public costResponses?: CostResponse[],
        public orderCosts?: OrderCost[],
        public dayDepotId?: number,
        public metreId?: number,
        public metreDate?: any,
        public metreEndDate?: any,
        public primitiveAmount?: number,
        public unitTitle?: string,
        public startMetre?: number,
        public endMetre?: number,
        public dayDepotTitle?: string,
    ) {
    }
}

export class OrderCredit implements BaseEntity {
    constructor(
        public id?: number,
        public customerCreditId?: number,
        public decreasedCredit?: number,
        public decreasedAmount?: number,
        public decreasedCost?: number,
        public creditNumber?: number,
        public buyTypeUsage?: BuyTypeUsage,
        public settled?: boolean,
        public buyGroup?: BuyGroup | string,
        public orderId?: number,
        public orderProductId?: number,
    ) {
        this.settled = false;
    }
}

export class OrderCost implements BaseEntity {
    constructor(
        public id?: number,
        public costId?: number,
        public rate?: number,
        public productId?: number,
        public orderId?: number,
        public orderProductId?: number,
    ) {
    }
}

export class OrderDiscountDTO {
    constructor(
        public id?: number,
        public boundaryDiscountId?: number,
        public amount?: number,
        public destinationCountryCode?: string,
        public maxAmount?: number,
        public price?: number,
        public orderId?: number
    ) {
    }
}

export class BoundarySell {
    constructor(
        public id?: number,
        public customerId?: number,
        public customerTypeId?: number,
        public price?: number,
        public currencyRateGroupId?: number,
        public currencyId?: number,
        public locationId?: number,
        public targetCountryId?: number,
        public vehicleModelId?: number,
        public currencyTitle?: string,
        public cmr?: string,
        public carnet?: string,
        public capote?: string,
        public boundarySellItems?: BoundarySellItem[],
        public orderType?: string,
        public orderNo?: string,
        public status?: string,
        public orderDiscount?: OrderDiscountDTO,
        public registerDate?: any,
        public orderCreationMethod?: any,
        public alongFuelAmount?: number,
        public pumpNozzleAmount?: number,
        public alongFuelPrice?: number,
        public pumpNozzlePrice?: number,
        public alongFuelRegisterDate?: any,
        public pumpNozzleRegisterDate?: any,
        public orderPrePays?: OrderPrePay[],
        public payId?: string,
        public multiPrePay ?: boolean,
        public createBankTransaction ?: boolean,
        public totalDiscountPrice?: number,
        public vehicleModelType?: VehicleModelType,
        public personFirstName?: string,
        public personLastName?: string,
        public tolerance?: number,
    ) {
        this.orderDiscount = new OrderDiscountDTO();
    }
}

export class BoundarySellItem {
    constructor(
        public id?: number,
        public productId?: number,
        public totalPrice?: number,
        public basePrice?: number,
        public realProductRatePrice?: number,
        public productRatePrice?: number,
        public productRateId?: number,
        public costPrice?: number,
        public amount?: number,
        public realAmount?: number,
        public orderId?: number,
        public carTankId?: number,
        public height?: number,
        public pumpNozzleAmount?: number,
        public primitiveAmount?: number,
        public primitiveHeight?: number,
        public amountType?: string | AmountType,
        public secondaryAmount?: number,
        public radius?: number,
        public latitude?: number,
        public longitude?: number,
        public productTitle?: string,
        public src?: string,
        public carTank?: CarTank,
        public niopdcBankAccountTypeId?: number,
        public costResponses?: CostResponse[],
        // public amountMin?: number,
        // public primitiveAmountMin?: number,
        // public heightMin?: number,
        // public primitiveHeightMin?: number,
        public tankNo?: number,
        public maxAmount?: number // for no primitive measurement,
    ) {
    }
}

export enum AmountType {
    'NORMAL',
    'PUMP_NOZZLE_AMOUNT',
    'CAR_TANK_4_AMOUNT'
}

export class CostRateFilter {
    constructor(
        public currencyId?: number,
        public currencyRateGroupId?: number,
        public sellProductAmount?: SellProductAmount) {
    }
}

export class SellProductAmount {
    constructor(public sellContractProductId?: number,
                public amount?: number) {
    }
}

export class RateResponse {
    constructor(public productId?: number,
                public amount?: number,
                public productBasePrice?: number,
                public productRate?: number,
                public containerRate?: number,
                public productRateRial?: number,
                public basePriceRial?: number,
                public currencyRatePrice?: number,
                public costResponses?: CostResponse[]) {
    }
}

export class ProductAmountResponse {
    constructor(public currencyRateId?: number,
                public currencyRatePrice?: number,
                public productId?: number,
                public productRateId?: number,
                public productRatePrice?: number,
                public realProductRatePrice?: number,
                public productTotalPrice?: number,
                public productNiopdcBankAccountId?: number,
                public amount?: number,
                public rateGroupId?: number,
                public containerTotalPrice?: number,
                public containerRatePrice?: number,
                public containerRateId?: number,
                public containerRateGroupId?: number,
                public containerNiopdcBankAccountId?: number,
                public count?: number,
                public costResponses?: CostResponse[]) {
    }
}

export class CostResponse {
    constructor(public costGroupTitle?: String,
                public price?: number,
                public costId?: number,
                public costType?: CostType,
                public costAction?: CostAction,
                public costRelated?: CostRelated,
                public productRateEffect?: boolean
    ) {
    }
}

export class ConnectDepot {
    constructor(
        public id?: number,
        public depotId?: number,
        public depotSendDate?: any,
        public depotTitle?: string,
        public type?: string,
        public depotSendCode?: string,
        public productId?: number,
        public startOrderNo?: number,
        public endOrderNo?: number,
        public endDate?: any,
        public startDate?: any,
    ) {
    }
}

export class OrderReport {
    constructor(public area?: string,
                public zone ?: string,
                public exportDate?: any,
                public  productCode?: string,
                public  productTitle?: string,
                public  orderNo?: string,
                public  reciptNo?: string,
                public  amount?: string,
                public  depot?: string,
                public  customerNo?: string,
                public  customerCode?: string,
                public  customerTitle?: string,
                public  cost?: number,
                public  wage?: number,
                public  evaporation?: string,
                public  productRate?: string,
                public  productPrice?: number,
                public  totalPrice?: number,
                public  address?: string,
                public  contractNo?: string,
                public  salesman?: string,
                public  expireDay?: number,
                public  transportContractPerson?: string,
                public  creditNo?: string) {
    }
}

export class BoundaryReport {
    constructor(
        public exportDate?: any,
        public productTitle?: string,
        public productCode?: string,
        public boundaryArea?: string,
        public area?: string,
        public orderNo?: string,
        public amount?: number,
        public totalAmount?: number,
        public buyerTitle?: string,
        public productRate?: number,
        public tankPrice?: number,
        public totalPrice?: number,
        public expireDate?: number,
        public rfId?: string,
        public plaque?: string,
        public vehicleModelTitle?: string,
        public longitude?: any,
        public latitude?: any,
        public height?: any,
        public tankNo?: any,
        public tankType?: any,
        public amountType?: any,
        public username?: any,
        public startShift?: any,
        public endShift?: any,
    ) {
    }
}

export class OrderPrePay {
    constructor(
        public id?: any,
        public niopdcBankAccountTypeId?: any,
        public niopdcBankAccountTypeTitle?: any,
        public price?: string,
        public remainPrice?: string,
        public order?: string,
        public status?: string,
        public receiptNos?: string[]
    ) {
    }
}
