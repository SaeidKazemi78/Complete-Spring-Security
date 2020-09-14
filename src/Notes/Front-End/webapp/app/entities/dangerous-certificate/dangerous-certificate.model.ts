import { BaseEntity } from './../../shared';

    export enum TypeOfDangerousCertificateCard {
            'TEMPORARY',
            'ALWAYS'
    }

export class DangerousCertificate implements BaseEntity {
    constructor(
    public id?: number,
    public cardNumber?: string,
    public cardExpireDate?: any,
    public type?: TypeOfDangerousCertificateCard,
    public driverId?: number,
    public depotId?: number,
) {
    }
}
