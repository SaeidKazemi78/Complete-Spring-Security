import {BaseEntity} from './../../shared';

export  enum NewsType {
    'ALERT',
    'NEWS',
    'EVENT',
    'INFO'
}

export enum NewsAccessType {
    'PUBLIC',
    'INTERNAL'
}

export class News implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public summary?: string,
                public startDate?: any,
                public finishDate?: any,
                public createdDate?: any,
                public content?: string,
                public newsType?: any,
                public newsAccessType?: any,
                public pictureContentType?: string,
                public thumbnailContentType?: string,
                public picture?: any,
                public thumbnail?: any,
                public attachment?: any,
                public showNews?: boolean,
                public locations?: number[],
                public userTypes?: any[],
                public fileId?: number,
                public refuelCenters?: any[]) {
    }
}
