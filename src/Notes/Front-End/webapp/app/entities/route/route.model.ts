import { BaseEntity } from './../../shared';

    export const enum RouteType {
            'EMERGENCY_ROUTE',
            'URBAN_HARD',
            'PROCUREMENT_LOCAL',
            'NORMAL_CITY',
            'NORMAL_LOCAL_PROCUREMENT',
            'BULK_URBAN_GAS',
            'VOLUMETRIC_GAS_SUPPLY',
            'FREE',
            'INSTANT'
    }

export class Route implements BaseEntity {
    constructor(
    public id?: number,
    public sourceCode?: string,
    public sourceTadaCode?: string,
    public sourceName?: string,
    public customerCode?: string,
    public destCode?: string,
    public destOpCode?: string,
    public destName?: string,
    public oldCode?: string,
    public isActive?: boolean,
    public customerStatus?: number,
    public hamlType?: boolean,
    public customerType?: number,
    public rate?: number,
    public distanceKm?: number,
    public description?: string,
    public executeDate?: any,
    public taCode?: string,
    public code?: string,
    public customerName?: string,
    public address?: string,
    public via?: number,
    public caption?: string,
    public routeType?: RouteType,
) {
        this.isActive = false;
        this.hamlType = false;
    }
}
