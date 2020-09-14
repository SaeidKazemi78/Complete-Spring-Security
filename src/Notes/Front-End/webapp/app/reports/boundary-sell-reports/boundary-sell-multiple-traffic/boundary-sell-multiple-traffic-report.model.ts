export class BoundarySellMultipleTrafficReport {
    constructor(
        public locationName: string,
        public registerDate: any,
        public amount: number,
        public carRfId: number,
        public price: number,
        public plaque: string,
        public count: number,
    ) {
    }
}
