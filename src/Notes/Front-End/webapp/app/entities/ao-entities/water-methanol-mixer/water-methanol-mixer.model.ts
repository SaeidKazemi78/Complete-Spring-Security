import {BaseEntity} from '../../../shared/index';

export class WaterMethanolMixer implements BaseEntity {
    constructor(
        public id?: number,
        public waterAmount?: number,
        public methanolAmount?: number,
        public waterId?: number,
        public methanolId?: number,
        public methanolMixerId?: number,
    ) {
    }
}
