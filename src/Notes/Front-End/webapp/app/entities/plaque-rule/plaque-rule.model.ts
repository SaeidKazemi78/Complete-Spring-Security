import {BaseEntity} from './../../shared';

export  enum DigitType {
    'NUMBER',
    'PERSIAN_WORD',
    'ENGLISH_WORD'
}

export class PlaqueRule implements BaseEntity {
    constructor(
        public id?: number,
        public digit?: number,
        public priority?: number,
        public digitType?: any,
        public plaqueId?: number,
    ) {
    }
}
