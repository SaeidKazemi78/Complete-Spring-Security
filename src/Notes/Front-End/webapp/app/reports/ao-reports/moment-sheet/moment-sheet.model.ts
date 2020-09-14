import {State} from '@progress/kendo-data-query/dist/npm/state';

export class MomentSheetAo {
    constructor(
        public oilTankCode?: string,
        public productTitle?: string,
        public startMeasurementOilTankAmount?: number,
        public receivedFromOilTanks?: number,
        public receivedFromLogBooks?: number,
        public receivedFromUnitOilTanks?: number,
        public sumOfReceive?: number,
        public sendToUnitOilTanks?: number,
        public sendToServiceOilTanks?: number,
        public sendToContaminatedOilTanks?: number,
        public sendToOilTanks?: number,
        public sendToLogBooks?: number,
        public sumOfSends?: number,
        public addition?: number,
        public deductible?: number,
        public endMeasurementOilTankAmount?: number,
        public day?: any,
    ) {
    }
}

export class MomentSheetDepot {
    constructor(
        public oilTankCode ?: string,
        public addition ?: number,
        public deductible ?: number,
        public day ?: any,
        public endMeasurementOilTankAmount ?: number,
        public startMeasurementOilTankAmount ?: number,
        public receiveDepots ?: number,
        public receiveTransferContaminants ?: number,
        public receiveTransferRecycles ?: number,
        public receiveTransferMains ?: number,
        public receiveTransferUnits ?: number,
        public receiveTransferServiceTanks ?: number,
        public receiveTransferTotals ?: number,
        public sendDepots?: number,
        public sendToUnits?: number,
        public sendToContaminants?: number,
        public sendToRecycles?: number,
        public sendToServiceTanks?: number,
        public sendSells?: number,
        public sendToPlatforms?: number,
        public sendTotals?: number,
    ) {
    }
}

export class MomentSheetRequest {
    constructor(
        public state?: State,
        public refuelCenterId?: number,
        public startTime?: any,
        public endTime?: any
    ) {
    }
}

export class NinePageRequest {
    constructor(
        public state?: State,
        public refuelCenterId?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}

export class SellGroundFuelRequest {
    constructor(
        public day?: any,
        public refuelCenterId?: number
    ) {
    }
}
