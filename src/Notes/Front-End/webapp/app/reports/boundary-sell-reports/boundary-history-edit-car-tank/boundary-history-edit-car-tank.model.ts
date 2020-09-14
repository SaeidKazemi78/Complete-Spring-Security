export class BoundaryHistoryEditCarTankResponse {
    constructor(
        public   customers?: BoundaryHistoryEditCarTank[],
        public   details?: BoundaryHistoryEditCarTankDetails[]
    ) {
    }
}

export class BoundaryHistoryEditCarTank {
    constructor(
        public customerId?: number,
        public plaqueOne?: string,
        public plaqueTwo?: string,
        public carRfId?: string,
        public details?: BoundaryHistoryEditCarTankDetails[],
    ) {
    }
}

export class BoundaryHistoryEditCarTankDetails {
    constructor(
        public customerId?: number,
        public tankType?: string,
        public height?: number,
        public latitude?: number,
        public longitude?: number,
        public tankNo?: string,
        public timestamp?: any,
    ) {
    }
}

export class BoundaryHistoryEditCarTankRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}
