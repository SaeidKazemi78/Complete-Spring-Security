import { BaseEntity } from './../../shared';

export class Plaque implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
    public code?: string,
    public pattern?: string
) {
    }
}

export class CustomPlaque  {
    constructor(
        public plaqueCode?: number,
        public plaque?: string,
        public part1?: string,
        public part2?: string,
        public part3?: string
    ) {
    }
}
