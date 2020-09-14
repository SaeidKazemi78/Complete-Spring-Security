import {BaseEntity} from './../../shared';

export  enum Method {
    'POST',
    'GET',
    'DELETE',
    'PUT'
}

export class ActionLog implements BaseEntity {
    constructor(public id?: number,
                public remoteAddress?: string,
                public header?: string,
                public requestBody?: string,
                public createdDate?: any,
                public status?: number,
                public url?: string,
                public label?: string,
                public method?: string,
                public username?: string) {
    }
}

export class ActionLogMapping implements BaseEntity {
    constructor(public id?: number,
                public url?: string,
                public templateUrl?: string,
                public method?: string,
                public persianName?: string) {
    }
}

export class ActionLogRequest implements BaseEntity {
    constructor(public id?: number,
                public remoteAddress?: string,
                public roleName?: string,
                public createdDate?: any,
                public startDate?: any,
                public finishDate?: any,
                public showAll?: boolean,
                public locationIds?: any[],
                public url?: string,
                public method?: Method,
                public username?: string) {
    }
}
