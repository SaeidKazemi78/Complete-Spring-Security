import {BaseEntity} from '../../../shared/index';

export enum ChangeContainerType {
    'WITH_CONTAINER',
    'WITHOUT_CONTAINER'
}

export class ChangeContainer implements BaseEntity {
    constructor(public id?: number,
                public amount?: number,
                public count?: number,
                public changeContainerType?: any,
                public sourceId?: number,
                public sourceOilTankContainerId?: number,
                public sourceTitle?: string,
                public dayDepotContainerId?: number,
                public targetId?: number,
                public targetOilTankContainerId?: number,
                public targetTitle?: string,
                public dayDepotId?: number,
                public dayDepotTitle?: string) {
    }
}
