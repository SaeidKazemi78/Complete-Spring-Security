import {BaseEntity} from '../../../shared/index';

export class Airport implements BaseEntity {
    constructor(
        public id?: number,
        public persianTitle?: string,
        public englishTitle?: string,
        public globalCode?: string,
        public code?: string,
        public regionId?: number,
        public countryId?: number,
        public targetAirportIds?: number[],
        public targetAirports?: Airport[],
    ) {
    }
}
