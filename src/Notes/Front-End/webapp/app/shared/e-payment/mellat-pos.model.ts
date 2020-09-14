export class MellatPosSale {
    constructor(public PcID: string,
                public ServiceCode?: string,
                public Amount?: string,
                public PayerId?: string,
                public AccountID?: string,
                public TotalAmount?: string,
                public PrintDetail?: string,
                public RequestList?: { 'AccountID': string, 'Amount': string, 'PayerID': string}[]

    ) {
    }
}

export class MellatPosSaleResponse {
    constructor(
        public AccountNo: string,
        public DiscountAmount: string,
        public PAN: string,
        public PcID: string,
        public ReasonCode: string,
        public ReqID: string,
        public ReturnCode: number,
        public SerialTransaction: string,
        public TerminalNo: string,
        public TotalAmount: string,
        public TraceNumber: string,
        public TransactionDate: string,
        public TransactionTime: string
    ) {
    }
}
