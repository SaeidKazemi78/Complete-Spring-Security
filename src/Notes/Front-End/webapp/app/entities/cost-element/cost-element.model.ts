import { BaseEntity } from './../../shared';

    export const enum CustomerGroup {
            'STATION',
            'SELLER'
    }

export class CostElement implements BaseEntity {
    constructor(
    public id?: number,
    public code?: string,
    public customerGroup?: CustomerGroup,
    public costGroupId?: number,
    public costId?: number,
    public productId?: number,
) {
    }
}
