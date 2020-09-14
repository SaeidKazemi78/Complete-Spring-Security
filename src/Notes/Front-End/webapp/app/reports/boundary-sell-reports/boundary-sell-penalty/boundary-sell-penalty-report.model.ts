export class BoundarySellPenaltyReport {
    constructor(
        public locationName: string,
        public carRfId: string,
        public plaque: string,
        public orderType: string,
        public bakProductRatePrice: number,
        public bakAmount: number,
        public bakPrice: number,
        public bakFourProductRatePrice: number,
        public bakFourAmount: number,
        public bakFourPrice: number,
        public pumpProductRatePrice: number,
        public pumpAmount: number,
        public pumpPrice: number,
        public totalPrice: number,
    ) {
    }
}
