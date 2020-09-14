import { BaseEntity } from './../../shared';

    export const enum Parts {
            'PART1',
            'PART2',
            'PART3',
            'PART4'
    }

export class AccountNumberItems implements BaseEntity {
    constructor(
    public id?: number,
    public part?: Parts |any,
    public content?: string,
    public title?: string,
) {
    }
}
