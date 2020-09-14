import {BaseEntity} from './../../shared';

export  enum Method {
    'POST',
    'GET',
    'DELETE',
    'PUT'
}

export class ActionLogMapping implements BaseEntity {
    constructor(public id?: number,
                public url?: string,
                public method?: string,
                public templateUrl?: string,
                public persianName?: string) {
    }
}
