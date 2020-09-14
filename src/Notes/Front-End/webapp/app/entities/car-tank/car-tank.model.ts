import { BaseEntity } from './../../shared';

    export  enum TankType {
            'CUBE',
            'D_SHAPE',
            'L_SHAPE',
            'STEPPING',
            'CYLINDER'
    }

export class CarTank implements BaseEntity {
    constructor(
    public id?: number,
    public longitude?: number,
    public latitude?: number,
    public height?: number,
    public radius?: number,
    public maxHeight?: number,
    public tankType?: any,
    public tankNo?: number,
    public title?: string,
    public customerId?: number,
) {
    }
}
