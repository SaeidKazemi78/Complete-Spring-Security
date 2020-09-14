import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class AoMountReport {
    constructor(
        public personName: string,
        public airportName: string,
        public sumDomesticFlightAmount: number,
        public countDomesticFlightAirplane: number,
        public sumInternationalFlightAmount: number,
        public countInternationalFlightAirplane: number,
        public sellType: string,
        public currency: string,
        public buyGroup: string

    ) {
    }
}

export class AoMountReportRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
