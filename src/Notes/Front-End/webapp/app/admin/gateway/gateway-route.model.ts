export class GatewayRoute {
    constructor(
        public path: string,
        public serviceId: string,
        public serviceInstances: any[]
    ) {
    }
}

export class Health {
    constructor(
        public  url?: string,
        public  serviceName?: string,
        public  clientName?: string,
        public   domain?: string,
        public  telnet?: string,
        public  ping?: string,
        public  connection?: string,
        public  exception?: string
    ) {

    }
}
