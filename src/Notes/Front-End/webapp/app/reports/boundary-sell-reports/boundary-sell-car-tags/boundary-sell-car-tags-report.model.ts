// import {State} from '@progress/kendo-data-query';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class BoundarySellCarTagsReport {
    constructor(
        public registerTag: number,
        public assignTag: number,
        public activeTag: number,
        public newTag: number,
        public missingTag: number,
        public defectiveTag: number,
        public locationName: string,
    ) {

    }
}

export class BoundarySellCarTagsRequest {
    constructor(
        public startDate?: any,
        public finishDate?: any,
        public carRfId?: string,
        public locationIds?: number[],
        public plaque?: string,
        public state?: State,
    ) {

    }
}
