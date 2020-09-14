import {BaseEntity} from './../../shared';

export enum Psp {
    'BEHPARDAKHT',
    'SADAD'
}

export class PspConfig implements BaseEntity {
    constructor(
        public id?: number,
        public psp?: Psp | string,
        public pspIcon?: string,
        public active?: boolean,
        public activeIpg?: boolean,
        public activePos?: boolean,
        public actionUrl?: string,
    ) {
        this.active = false;
        this.activeIpg = false;
        this.activePos = false;
    }
}
