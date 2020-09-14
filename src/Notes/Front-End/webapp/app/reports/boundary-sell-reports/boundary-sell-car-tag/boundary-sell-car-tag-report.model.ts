// import {State} from '@progress/kendo-data-query';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class BoundarySellCarTagReport {
    constructor(
        public info?: BoundarySellCarTagInfo[],
        public details?: BoundarySellCarTagDetails[],
    ) {
    }
}

export class BoundarySellCarTagRequest {
    constructor(
        public startDate?:any,
        public finishDate?:any,
        public carRfId?: string,
        public plaqueModel?: PlaqueRequest,
        public plaque?: string,
        public state?: State,

) {

    }
}

export class PlaqueRequest {
    constructor(
        public plaque?: string,
        public plaqueCode?: string,
        public search?: string
    ) {
    }
}

export class BoundarySellCarTagInfo{
    constructor(
   public carRfId?: string,
   public plaque?: string,
   public plaqueTwo?: string,
   public customerId?:number){

    }
}
export class BoundarySellCarTagDetails{
    constructor(
      public customerId?: number,
      public carRfId?:string,
      public createdBy?: string,
      public  createdDate?: any,
      public  locationTitle?:string){

    }
}




