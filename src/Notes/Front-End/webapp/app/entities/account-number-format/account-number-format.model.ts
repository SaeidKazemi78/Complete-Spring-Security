import { BaseEntity } from './../../shared';

export class AccountNumberFormat implements BaseEntity {
    constructor(
    public id?: number,
    public part1?: string,
    public part2?: string,
    public part3?: string,
    public part4?: string,
    public title?: string,
    public format?: string,
) {
    }
}
