export class PosInfo {
    constructor(public Description?: string,
                public SupportedDevices?: string,
                public Version?: string
    ) {
    }
}
export class MelliPosDevice {
    constructor(public Header?: string,
                public IpAdress?: string,
                public MerchantId?: string,
                public MerchantName?: string,
                public Port?: string,
                public TerminalId?: string
    ) {
    }
}
export class MelliPosSale {
    constructor(public DeviceIp?: string,
                public DevicePort?: string,
                public ConnectionType?: string,
                public MultiMerchant?: string,
                public DivideType?: string,
                public Amount?: string
    ) {
    }
}
export class MelliPosSaleResponse {
    constructor(public Amount?: string,
                public ApprovalCode?: string,
                public CardNo?: string,
                public Merchant?: string,
                public OptionalField?: string,
                public PacketType?: string,
                public PcPosStatus?: string,
                public ProccessingCode?: string,
                public ResponseCode?: string,
                public Rrn?: string,
                public Terminal?: string,
                public TransactionDate?: string,
                public TransactionNo?: string,
                public TransactionTime?: string
    ) {
    }
}
