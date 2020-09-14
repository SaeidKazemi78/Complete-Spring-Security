import {BaseEntity} from '../../../shared/index';

export class Metre implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public maxMetre?: number,
        public amount?: number,
        public active?: boolean,
        public oilTankId?: number,
    ) {
        this.active = false;
    }
}
